import { NextResponse } from "next/server";
import { validateContact } from "@/lib/contact";
import { renderEnquiryEmail } from "@/lib/email/enquiry";

/**
 * Contact form endpoint. Delivery, in order of preference:
 *
 * 1. Email over SMTP — set CONTACT_TO_EMAIL and SMTP_HOST / SMTP_USER /
 *    SMTP_PASS (e.g. Gmail with an App Password). The visitor's address is
 *    used as Reply-To, so you can answer straight from your inbox.
 * 2. Webhook — set CONTACT_WEBHOOK_URL to an http(s) endpoint that accepts a
 *    JSON POST (Zapier/Make, Slack, CRM, internal API).
 *
 * With neither configured, development logs the submission and returns OK;
 * production returns 503 so misconfiguration is visible.
 */

type Submission = {
  name: string;
  email: string;
  company: string | null;
  projectType: string;
  message: string;
  source: string;
  submittedAt: string;
};

type Result = { ok: true } | { ok: false; reason: "not-configured" | "upstream" };

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

function smtpConfig() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_TO_EMAIL) return null;
  const port = Number(SMTP_PORT) || 587;
  return {
    host: SMTP_HOST,
    port,
    user: SMTP_USER,
    pass: SMTP_PASS,
    to: CONTACT_TO_EMAIL,
    from: CONTACT_FROM_EMAIL || `Celestiq Technologies Website <${SMTP_USER}>`,
  };
}

/** Returns the webhook URL only if it is a real http(s) URL. */
function webhookUrl() {
  const raw = process.env.CONTACT_WEBHOOK_URL?.trim();
  if (!raw) return null;
  try {
    const u = new URL(raw);
    if (u.protocol === "https:" || u.protocol === "http:") return u.toString();
  } catch {}
  console.error(
    `[contact] CONTACT_WEBHOOK_URL must be an http(s) URL; got "${raw}". To receive enquiries by email, set CONTACT_TO_EMAIL and the SMTP_* variables instead.`,
  );
  return null;
}

async function sendEmail(cfg: NonNullable<ReturnType<typeof smtpConfig>>, d: Submission): Promise<Result> {
  const nodemailer = await import("nodemailer");
  const transport = nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.port === 465,
    auth: { user: cfg.user, pass: cfg.pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
  const { subject, html, text } = renderEnquiryEmail(d);

  await transport.sendMail({
    from: cfg.from,
    to: cfg.to,
    replyTo: { name: d.name, address: d.email },
    subject,
    text,
    html,
  });
  return { ok: true };
}

async function deliver(d: Submission): Promise<Result> {
  const smtp = smtpConfig();
  if (smtp) return sendEmail(smtp, d);

  const url = webhookUrl();
  if (url) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(d),
      signal: AbortSignal.timeout(10_000),
    });
    return res.ok ? { ok: true } : { ok: false, reason: "upstream" };
  }

  if (process.env.NODE_ENV !== "production") {
    console.info("[contact] No email or webhook delivery configured — submission logged only:", d);
    return { ok: true };
  }
  return { ok: false, reason: "not-configured" };
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many requests. Please try again in a few minutes." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const { data, errors } = validateContact((body ?? {}) as Record<string, unknown>);

  // Honeypot: pretend success so bots learn nothing.
  if (data.website) return NextResponse.json({ ok: true });

  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, error: "Please check the highlighted fields.", errors }, { status: 422 });
  }

  try {
    const result = await deliver({
      name: data.name,
      email: data.email,
      company: data.company || null,
      projectType: data.projectType,
      message: data.message,
      source: "celestiq-website",
      submittedAt: new Date().toISOString(),
    });
    if (!result.ok) {
      console.error("[contact] delivery failed:", result.reason);
      return NextResponse.json(
        { ok: false, error: "We couldn't send your message right now. Please try again shortly." },
        { status: result.reason === "not-configured" ? 503 : 502 },
      );
    }
  } catch (err) {
    console.error("[contact] delivery error:", err);
    return NextResponse.json({ ok: false, error: "We couldn't send your message right now. Please try again shortly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
