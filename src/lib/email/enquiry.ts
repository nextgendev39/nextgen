import { site } from "../site";

/**
 * "New enquiry" notification sent to the team when the contact form is
 * submitted.
 *
 * Built for email clients, not browsers: table layout, inline styles,
 * web-safe font stack, a solid-colour fallback behind every gradient
 * (Outlook desktop ignores gradients), no SVG (Gmail strips it) and a
 * plain-text alternative. Every user-supplied value is HTML-escaped.
 */

export type EnquiryEmailData = {
  name: string;
  email: string;
  company: string | null;
  projectType: string;
  message: string;
  source: string;
  /** ISO 8601 timestamp */
  submittedAt: string;
};

const C = {
  page: "#eef1f8",
  card: "#ffffff",
  ink: "#0a0f1f",
  muted: "#5b6480",
  subtle: "#8a93ad",
  line: "#e3e8f3",
  soft: "#f6f8fc",
  electric: "#3d7bff",
  violet: "#6d5bff",
  header: "#0a1022",
  signal: "#3ddcc4",
};

const FONT = `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`;

const esc = (v: string) =>
  v.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Escapes text and keeps the visitor's line breaks (pre-wrap is unreliable in email). */
const paragraphs = (v: string) => esc(v).replace(/\r\n?/g, "\n").replace(/\n/g, "<br>");

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short",
  }).format(d);
}

/** Short reference so a conversation can be traced back to its submission. */
function reference(d: EnquiryEmailData) {
  const t = new Date(d.submittedAt);
  const stamp = Number.isNaN(t.getTime()) ? d.submittedAt.replace(/\D/g, "").slice(0, 12) : t.toISOString().replace(/\D/g, "").slice(2, 12);
  let h = 0;
  for (const ch of d.email + d.submittedAt) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return `CQ-${stamp}-${h.toString(36).slice(-4).toUpperCase().padStart(4, "0")}`;
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const chars = parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : (parts[0] ?? "?").slice(0, 2);
  return chars.toUpperCase();
}

export function enquirySubject(d: EnquiryEmailData) {
  return `New enquiry: ${d.projectType} — ${d.name}`.replace(/[\r\n]+/g, " ").slice(0, 200);
}

export function renderEnquiryEmail(d: EnquiryEmailData): { subject: string; html: string; text: string } {
  const subject = enquirySubject(d);
  const ref = reference(d);
  const when = formatDate(d.submittedAt);
  const firstName = d.name.split(/\s+/)[0] || d.name;
  const words = d.message.trim().split(/\s+/).filter(Boolean).length;

  const replySubject = `Re: Your enquiry to ${site.name} — ${d.projectType}`;
  const replyBody = `Hi ${firstName},\n\nThanks for getting in touch with ${site.name}.\n\n`;
  const mailto = `mailto:${encodeURIComponent(d.email)}?subject=${encodeURIComponent(replySubject)}&body=${encodeURIComponent(replyBody)}`;

  const preheader = `${d.name}${d.company ? ` (${d.company})` : ""} · ${d.projectType} — ${d.message.replace(/\s+/g, " ").slice(0, 110)}`;

  const detailRow = (label: string, value: string, last = false) => `
              <tr>
                <td style="padding:14px 0;${last ? "" : `border-bottom:1px solid ${C.line};`}width:120px;vertical-align:top;font:600 11px/18px ${FONT};letter-spacing:0.08em;text-transform:uppercase;color:${C.subtle};">${label}</td>
                <td style="padding:14px 0;${last ? "" : `border-bottom:1px solid ${C.line};`}vertical-align:top;font:500 15px/22px ${FONT};color:${C.ink};word-break:break-word;">${value}</td>
              </tr>`;

  const html = `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>${esc(subject)}</title>
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
  <style>
    body { margin:0; padding:0; width:100% !important; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
    table { border-collapse:collapse; mso-table-lspace:0; mso-table-rspace:0; }
    img { border:0; outline:none; text-decoration:none; -ms-interpolation-mode:bicubic; }
    a { color:${C.electric}; }
    @media only screen and (max-width:620px) {
      .container { width:100% !important; }
      .px { padding-left:22px !important; padding-right:22px !important; }
      .h1 { font-size:24px !important; line-height:32px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:${C.page};">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:${C.page};opacity:0;">${esc(preheader)}&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${C.page};">
    <tr>
      <td align="center" style="padding:32px 12px;">
        <!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
        <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;">

          <!-- Brand bar -->
          <tr>
            <td style="padding:0 4px 16px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="vertical-align:middle;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="vertical-align:middle;padding-right:10px;">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td align="center" width="32" height="32" bgcolor="${C.header}" style="width:32px;height:32px;border-radius:9px;background-color:${C.header};background-image:linear-gradient(135deg,${C.electric},${C.violet});font:800 16px/32px ${FONT};color:#ffffff;">N</td>
                            </tr>
                          </table>
                        </td>
                        <td style="vertical-align:middle;font:700 16px/20px ${FONT};color:${C.ink};letter-spacing:-0.01em;">${esc(site.name)}</td>
                      </tr>
                    </table>
                  </td>
                  <td align="right" style="vertical-align:middle;font:500 12px/16px ${FONT};color:${C.subtle};">Website enquiry</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background-color:${C.card};border-radius:16px;overflow:hidden;border:1px solid ${C.line};">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">

                <!-- Hero -->
                <tr>
                  <td class="px" bgcolor="${C.header}" style="background-color:${C.header};background-image:linear-gradient(135deg,${C.header} 0%,#16205a 55%,${C.violet} 130%);padding:36px 40px 34px;border-radius:16px 16px 0 0;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="background-color:rgba(61,220,196,0.14);border:1px solid rgba(61,220,196,0.35);border-radius:999px;padding:5px 12px;font:600 11px/14px ${FONT};letter-spacing:0.08em;text-transform:uppercase;color:${C.signal};">
                          &#9679;&nbsp; New enquiry
                        </td>
                      </tr>
                    </table>
                    <h1 class="h1" style="margin:18px 0 8px;font:700 28px/36px ${FONT};letter-spacing:-0.02em;color:#ffffff;">${esc(d.name)} wants to talk about ${esc(d.projectType)}</h1>
                    <p style="margin:0;font:400 14px/22px ${FONT};color:#b9c2de;">Received ${esc(when)} &nbsp;·&nbsp; Ref ${ref}</p>
                  </td>
                </tr>
                <tr>
                  <td height="4" bgcolor="${C.electric}" style="height:4px;line-height:4px;font-size:0;background-color:${C.electric};background-image:linear-gradient(90deg,${C.electric},${C.violet},#b49cff);">&nbsp;</td>
                </tr>

                <!-- Contact -->
                <tr>
                  <td class="px" style="padding:32px 40px 8px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="52" style="vertical-align:middle;padding-right:14px;">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td align="center" width="48" height="48" bgcolor="${C.electric}" style="width:48px;height:48px;border-radius:24px;background-color:${C.electric};background-image:linear-gradient(135deg,${C.electric},${C.violet});font:700 16px/48px ${FONT};color:#ffffff;">${esc(initials(d.name))}</td>
                            </tr>
                          </table>
                        </td>
                        <td style="vertical-align:middle;">
                          <p style="margin:0;font:700 17px/24px ${FONT};color:${C.ink};">${esc(d.name)}</p>
                          <p style="margin:2px 0 0;font:400 14px/20px ${FONT};color:${C.muted};">${d.company ? `${esc(d.company)} &nbsp;·&nbsp; ` : ""}<a href="mailto:${esc(d.email)}" style="color:${C.electric};text-decoration:none;">${esc(d.email)}</a></p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Details -->
                <tr>
                  <td class="px" style="padding:16px 40px 8px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${detailRow("Project", `<span style="display:inline-block;background-color:#edf2ff;border-radius:6px;padding:2px 10px;color:#2a5ae0;font-weight:600;">${esc(d.projectType)}</span>`)}${detailRow("Email", `<a href="mailto:${esc(d.email)}" style="color:${C.ink};text-decoration:none;">${esc(d.email)}</a>`)}${detailRow("Company", d.company ? esc(d.company) : `<span style="color:${C.subtle};">Not provided</span>`)}${detailRow("Received", esc(when), true)}
                    </table>
                  </td>
                </tr>

                <!-- Message -->
                <tr>
                  <td class="px" style="padding:20px 40px 8px;">
                    <p style="margin:0 0 10px;font:600 11px/18px ${FONT};letter-spacing:0.08em;text-transform:uppercase;color:${C.subtle};">Message &nbsp;<span style="font-weight:500;letter-spacing:0;text-transform:none;">· ${words} word${words === 1 ? "" : "s"}</span></p>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="background-color:${C.soft};border-left:3px solid ${C.electric};border-radius:0 10px 10px 0;padding:18px 22px;font:400 15px/25px ${FONT};color:${C.ink};word-break:break-word;">${paragraphs(d.message)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- CTA -->
                <tr>
                  <td class="px" align="left" style="padding:28px 40px 36px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center" bgcolor="${C.electric}" style="border-radius:10px;background-color:${C.electric};background-image:linear-gradient(135deg,${C.electric},${C.violet});">
                          <!--[if mso]><v:roundrect href="${esc(mailto)}" style="height:46px;v-text-anchor:middle;width:220px;" arcsize="22%" stroke="f" fillcolor="${C.electric}"><center style="color:#ffffff;font-family:Arial,sans-serif;font-size:15px;font-weight:bold;">Reply to ${esc(firstName)}</center></v:roundrect><![endif]-->
                          <!--[if !mso]><!--><a href="${esc(mailto)}" style="display:inline-block;padding:13px 26px;font:600 15px/20px ${FONT};color:#ffffff;text-decoration:none;border-radius:10px;">Reply to ${esc(firstName)} &rarr;</a><!--<![endif]-->
                        </td>
                      </tr>
                    </table>
                    <p style="margin:14px 0 0;font:400 13px/20px ${FONT};color:${C.subtle};">Or just hit reply — this email's Reply-To is set to ${esc(d.email)}.</p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:24px 16px 8px;font:400 12px/19px ${FONT};color:${C.subtle};">
              Sent automatically from the contact form on <a href="${site.url}" style="color:${C.muted};text-decoration:underline;">${esc(site.url.replace(/^https?:\/\//, ""))}</a><br>
              Source: ${esc(d.source)} &nbsp;·&nbsp; Ref ${ref}<br>
              &copy; ${new Date(d.submittedAt).getUTCFullYear() || new Date().getUTCFullYear()} ${esc(site.legalName)}
            </td>
          </tr>

        </table>
        <!--[if mso]></td></tr></table><![endif]-->
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    `NEW ENQUIRY — ${site.name}`,
    `Ref ${ref}`,
    "",
    `Name:      ${d.name}`,
    `Email:     ${d.email}`,
    `Company:   ${d.company || "Not provided"}`,
    `Project:   ${d.projectType}`,
    `Received:  ${when}`,
    "",
    "Message",
    "-------",
    d.message,
    "",
    `Reply directly to this email to respond to ${firstName}.`,
    "",
    `Sent from the contact form on ${site.url} (source: ${d.source}).`,
  ].join("\n");

  return { subject, html, text };
}
