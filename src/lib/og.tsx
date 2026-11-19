import { ImageResponse } from "next/og";

import { ogSize } from "./seo";

export { ogAlt, ogContentType, ogSize } from "./seo";

const C_PATH = "M47.6 16.4A22 22 0 1 0 47.6 47.6";
const STAR_PATH =
  "M32 20.5C33.1 28.2 35.8 30.9 43.5 32C35.8 33.1 33.1 35.8 32 43.5C30.9 35.8 28.2 33.1 20.5 32C28.2 30.9 30.9 28.2 32 20.5Z";

/**
 * The share image used for every page: the Celestiq logo (mark + wordmark +
 * "Technologies") centred on the brand background, with the tagline and
 * domain beneath. Defined once in `app/opengraph-image.tsx` and inherited
 * by every route.
 */
export function logoOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 50% 0%, #1b2a6b 0%, rgba(7,11,24,0) 60%), radial-gradient(circle at 85% 100%, #2a1f6b 0%, rgba(7,11,24,0) 45%), #070b18",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          <svg width="200" height="200" viewBox="0 0 64 64">
            <defs>
              <linearGradient id="g" x1="8" y1="58" x2="58" y2="6" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#2F6BFF" />
                <stop offset="0.55" stopColor="#6D5BFF" />
                <stop offset="1" stopColor="#B49CFF" />
              </linearGradient>
            </defs>
            <path d={C_PATH} fill="none" stroke="url(#g)" strokeWidth="6.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d={STAR_PATH} fill="#fff" />
            <circle cx="53.4" cy="10.6" r="3.6" fill="#B49CFF" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 128, fontWeight: 700, letterSpacing: -5, lineHeight: 1 }}>
              <span>Celest</span>
              <span style={{ color: "#8b7bff", marginLeft: -10 }}>iq</span>
            </div>
            <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: 15, color: "#8a93b3", marginTop: 14, marginLeft: 6 }}>
              TECHNOLOGIES
            </div>
          </div>
        </div>
        <div style={{ display: "flex", marginTop: 64, fontSize: 30, color: "#a3acc7" }}>Building Digital Products. Empowering Businesses.</div>
        <div style={{ display: "flex", marginTop: 14, fontSize: 24, color: "#6f7899", letterSpacing: 1 }}>celestiqtech.com</div>
      </div>
    ),
    ogSize,
  );
}
