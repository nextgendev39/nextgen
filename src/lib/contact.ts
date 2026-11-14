import { projectTypes } from "./content";

export type ContactPayload = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  message: string;
  /** Honeypot — must stay empty */
  website?: string;
};

export type ContactErrors = Partial<Record<keyof ContactPayload, string>>;

export const LIMITS = { name: 100, email: 254, company: 120, message: 4000 } as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Shared validation used by the form (client) and the API route (server). */
export function validateContact(input: Partial<Record<keyof ContactPayload, unknown>>): {
  data: ContactPayload;
  errors: ContactErrors;
} {
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const data: ContactPayload = {
    name: str(input.name),
    email: str(input.email).toLowerCase(),
    company: str(input.company),
    projectType: str(input.projectType),
    message: str(input.message),
    website: str(input.website),
  };
  const errors: ContactErrors = {};

  if (data.name.length < 2) errors.name = "Please enter your name.";
  else if (data.name.length > LIMITS.name) errors.name = `Please keep your name under ${LIMITS.name} characters.`;

  if (!data.email) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(data.email) || data.email.length > LIMITS.email) errors.email = "Please enter a valid email address.";

  if (data.company.length > LIMITS.company) errors.company = `Please keep this under ${LIMITS.company} characters.`;

  if (!data.projectType) errors.projectType = "Please choose a project type.";
  else if (!(projectTypes as readonly string[]).includes(data.projectType)) errors.projectType = "Please choose a project type from the list.";

  if (data.message.length < 20) errors.message = "Tell us a little more — at least 20 characters.";
  else if (data.message.length > LIMITS.message) errors.message = `Please keep your message under ${LIMITS.message} characters.`;

  return { data, errors };
}
