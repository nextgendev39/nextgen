import type { NextConfig } from "next";

const siteHost = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://celestiqtech.com").host;

const nextConfig: NextConfig = {
  poweredByHeader: false,
  /**
   * One canonical host: www.celestiqtech.com → celestiqtech.com (301).
   * HTTP → HTTPS is enforced by the host/CDN (automatic on Vercel); the
   * HSTS header below keeps browsers on HTTPS afterwards.
   */
  async redirects() {
    if (siteHost.startsWith("www.")) return [];
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: `www.${siteHost}` }],
        destination: `https://${siteHost}/:path*`,
        statusCode: 301,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Strict-Transport-Security", value: "max-age=31536000" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
