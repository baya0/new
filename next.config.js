/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,

  images: {
    // AVIF first (≈30% smaller than WebP on photo content), WebP fallback for
    // older Safari. Originals in /public/images have been resized so first-hit
    // transcode cost is acceptable.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },

  async headers() {
    const securityHeaders = [
      // Force browsers to use HTTPS for 2 years. Skip preload until you're
      // ready to submit to https://hstspreload.org.
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains",
      },
      // Block MIME-type sniffing.
      { key: "X-Content-Type-Options", value: "nosniff" },
      // Disallow loading the site in an iframe on other domains (clickjacking).
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      // Only send the path of the referring URL, not query strings, to other
      // origins.
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      // Block legacy Adobe Flash / PDF cross-domain access.
      { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
      // Disable browser features we don't use.
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
      },
    ];

    const immutableCache = [
      {
        key: "Cache-Control",
        value: "public, max-age=31536000, immutable",
      },
    ];

    return [
      {
        // Apply to every route.
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // Static images shipped from /public/images. Next.js handles
        // /_next/static and /_next/image caching internally via
        // `minimumCacheTTL` — overriding them here can break revalidation.
        source: "/images/:path*",
        headers: immutableCache,
      },
      {
        // Fonts shipped from /public/fonts (if any).
        source: "/fonts/:path*",
        headers: immutableCache,
      },
    ];
  },
};

module.exports = nextConfig;
