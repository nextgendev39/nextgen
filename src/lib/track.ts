/**
 * Report a conversion. Pushes to the dataLayer (GTM) and calls gtag (GA4)
 * when present; a no-op otherwise.
 */
export function trackEvent(name: string, params: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: object[]; gtag?: (...a: unknown[]) => void };
  if (w.gtag) w.gtag("event", name, params);
  else if (w.dataLayer) w.dataLayer.push({ event: name, ...params });
}
