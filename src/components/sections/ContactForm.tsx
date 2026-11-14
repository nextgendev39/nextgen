"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronDown, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LIMITS, validateContact, type ContactErrors, type ContactPayload } from "@/lib/contact";
import { projectTypes } from "@/lib/content";
import { PROJECT_TYPE_EVENT } from "@/lib/events";

const empty: ContactPayload = { name: "", email: "", company: "", projectType: "", message: "", website: "" };
type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [values, setValues] = useState<ContactPayload>(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactPayload, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Allow other sections (e.g. service cards) to pre-select a project type
  useEffect(() => {
    const onType = (e: Event) => {
      const type = (e as CustomEvent<string>).detail;
      if ((projectTypes as readonly string[]).includes(type)) {
        setValues((v) => ({ ...v, projectType: type }));
        setErrors((er) => ({ ...er, projectType: undefined }));
      }
    };
    window.addEventListener(PROJECT_TYPE_EVENT, onType);
    return () => window.removeEventListener(PROJECT_TYPE_EVENT, onType);
  }, []);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const update = (field: keyof ContactPayload) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const next = { ...values, [field]: e.target.value };
    setValues(next);
    if (touched[field]) setErrors((prev) => ({ ...prev, [field]: validateContact(next).errors[field] }));
  };

  const blur = (field: keyof ContactPayload) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateContact(values).errors[field] }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    const { errors: errs } = validateContact(values);
    setErrors(errs);
    setTouched({ name: true, email: true, company: true, projectType: true, message: true });
    const first = Object.keys(errs)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; errors?: ContactErrors };
      if (!res.ok || !json.ok) {
        if (json.errors) setErrors(json.errors);
        setServerError(json.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
      setValues(empty);
      setTouched({});
    } catch {
      setServerError("Network error — please check your connection and try again.");
      setStatus("error");
    }
  };

  return (
    <div className="glass relative rounded-[1.5rem] p-6 sm:p-8">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            ref={successRef}
            tabIndex={-1}
            role="status"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[28rem] flex-col items-center justify-center text-center outline-none"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-electric to-violet shadow-[0_10px_40px_-6px_rgba(109,91,255,0.9)]"
            >
              <CheckCircle2 className="h-8 w-8 text-snow" aria-hidden />
            </motion.span>
            <h3 className="mt-6 text-2xl font-semibold">Thanks — message received.</h3>
            <p className="mt-3 max-w-sm text-fg-muted">We&apos;ll review your project details and get back to you soon.</p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-8 rounded-full border border-white/15 px-5 py-2 text-sm text-fg hover:border-white/30"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-describedby={serverError ? "form-error" : undefined}
            className="grid gap-5 sm:grid-cols-2"
          >
            <Field id="name" label="Name" error={errors.name} required>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                maxLength={LIMITS.name}
                value={values.name}
                onChange={update("name")}
                onBlur={blur("name")}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={inputCls(!!errors.name)}
                placeholder="Your full name"
              />
            </Field>

            <Field id="email" label="Email" error={errors.email} required>
              <input
                id="email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                maxLength={LIMITS.email}
                value={values.email}
                onChange={update("email")}
                onBlur={blur("email")}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={inputCls(!!errors.email)}
                placeholder="you@company.com"
              />
            </Field>

            <Field id="company" label="Company" error={errors.company} hint="Optional">
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="organization"
                maxLength={LIMITS.company}
                value={values.company}
                onChange={update("company")}
                onBlur={blur("company")}
                aria-invalid={!!errors.company}
                aria-describedby={errors.company ? "company-error" : undefined}
                className={inputCls(!!errors.company)}
                placeholder="Company name"
              />
            </Field>

            <Field id="projectType" label="Project type" error={errors.projectType} required>
              <div className="relative">
                <select
                  id="projectType"
                  name="projectType"
                  value={values.projectType}
                  onChange={update("projectType")}
                  onBlur={blur("projectType")}
                  aria-invalid={!!errors.projectType}
                  aria-describedby={errors.projectType ? "projectType-error" : undefined}
                  className={`${inputCls(!!errors.projectType)} appearance-none pr-10 ${values.projectType ? "" : "text-fg-subtle"}`}
                >
                  <option value="" disabled>
                    Select a project type
                  </option>
                  {projectTypes.map((t) => (
                    <option key={t} value={t} className="bg-ink-850 text-fg">
                      {t}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-fg-subtle" aria-hidden />
              </div>
            </Field>

            <Field id="message" label="Message" error={errors.message} required className="sm:col-span-2">
              <textarea
                id="message"
                name="message"
                rows={5}
                maxLength={LIMITS.message}
                value={values.message}
                onChange={update("message")}
                onBlur={blur("message")}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : "message-count"}
                className={`${inputCls(!!errors.message)} min-h-36 resize-y py-3`}
                placeholder="What are you building, who is it for, and what does success look like?"
              />
              <span id="message-count" className="mt-1 block text-right text-xs text-fg-subtle tabular-nums">
                {values.message.length}/{LIMITS.message}
              </span>
            </Field>

            {/* Honeypot */}
            <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="website">Website</label>
              <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={update("website")} />
            </div>

            <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <p id="form-error" role="alert" className="text-sm text-danger">
                {serverError}
              </p>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="group inline-flex h-13 shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-electric via-violet to-[#8f6bff] px-8 font-semibold text-snow shadow-[0_10px_40px_-10px_rgba(77,107,255,0.8)] transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Sending…
                  </>
                ) : (
                  <>
                    Send message <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function inputCls(invalid: boolean) {
  return `h-12 w-full rounded-xl border bg-ink-900/60 px-4 text-[0.95rem] text-fg placeholder:text-fg-subtle transition focus:border-electric-soft focus:bg-ink-900 focus:ring-4 focus:ring-electric/15 focus:outline-none ${
    invalid ? "border-danger/70" : "border-white/10 hover:border-white/20"
  }`;
}

function Field({
  id,
  label,
  error,
  hint,
  required,
  className = "",
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 flex items-center justify-between text-sm font-medium text-fg">
        <span>
          {label}
          {required ? (
            <span className="text-electric-soft" aria-hidden>
              {" "}
              *
            </span>
          ) : null}
        </span>
        {hint ? <span className="text-xs font-normal text-fg-subtle">{hint}</span> : null}
      </label>
      {children}
      <AnimatePresence initial={false}>
        {error ? (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1.5 text-sm text-danger"
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
