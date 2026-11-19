/** Lightweight cross-component signal: pre-select a project type in the contact form. */
export const PROJECT_TYPE_EVENT = "celestiq:project-type";

export function selectProjectType(type: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<string>(PROJECT_TYPE_EVENT, { detail: type }));
}
