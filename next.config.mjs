// Content-Security-Policy (production only; the dev server needs looser rules). Only hosts this app really needs.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob: https://*.supabase.co",
  "media-src 'self' blob: https://interactive-examples.mdn.mozilla.net https://vjs.zencdn.net https://test-streams.mux.dev https://*.mux.dev",
  "connect-src 'self' https://*.supabase.co https://test-streams.mux.dev https://*.mux.dev https://vitals.vercel-insights.com",
  "worker-src 'self' blob:",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const baseHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const securityHeaders =
  process.env.NODE_ENV === "production"
    ? [{ key: "Content-Security-Policy", value: csp }, ...baseHeaders]
    : baseHeaders;

// Demo mode is on when DEMO_MODE=true OR when no Supabase project is configured,
// so the repo deploys with zero settings. Set a Supabase URL (and DEMO_MODE=false) for real mode.
const demoMode =
  process.env.DEMO_MODE === "true" || !process.env.NEXT_PUBLIC_SUPABASE_URL;

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  env: {
    DEMO_MODE: demoMode ? "true" : "false",
    NEXT_PUBLIC_DEMO_MODE: demoMode ? "true" : "false",
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "*.supabase.co", pathname: "/**" }],
  },
};

export default nextConfig;
