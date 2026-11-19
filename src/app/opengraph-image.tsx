import { ImageResponse } from "next/og";

export const alt = "Celestiq Technologies — Building Digital Products. Empowering Businesses.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "radial-gradient(circle at 20% 0%, #1b2a6b 0%, #070b18 55%), #070b18",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <svg width="88" height="88" viewBox="0 0 64 64">
            <defs>
              <linearGradient id="g" x1="8" y1="58" x2="58" y2="6" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#2F6BFF" />
                <stop offset="0.55" stopColor="#6D5BFF" />
                <stop offset="1" stopColor="#B49CFF" />
              </linearGradient>
            </defs>
            <path d="M47.2 13.6A25 25 0 1 0 57 32H45" fill="none" stroke="url(#g)" strokeWidth="6.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20.5 42.5V21.5l13 21V21.5" fill="none" stroke="#fff" strokeWidth="6.2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="54.6" cy="8.6" r="3.6" fill="#B49CFF" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 52, fontWeight: 700, letterSpacing: -2, display: "flex", lineHeight: 1 }}>
              Celest<span style={{ color: "#8b7bff" }}>iq</span>
            </div>
            <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: 7, color: "#8a93b3", marginTop: 8 }}>TECHNOLOGIES</div>
          </div>
          <div style={{ marginLeft: "auto", fontSize: 24, color: "#8a93b3" }}>celestiqtech.com</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2.5, maxWidth: 980 }}>
            Building Digital Products. Empowering Businesses.
          </div>
          <div style={{ fontSize: 28, color: "#a3acc7" }}>Websites · Web &amp; Mobile Apps · APIs · UI/UX — and our own SaaS: Autonexa, Flowza, BuildPilot</div>
        </div>
      </div>
    ),
    size,
  );
}
