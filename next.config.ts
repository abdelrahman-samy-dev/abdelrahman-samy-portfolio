import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // English is served at the root; Arabic under /ar. Routes live in app/[lang].
  async redirects() {
    return [
      { source: "/en", destination: "/", permanent: true },
      { source: "/en/:path*", destination: "/:path*", permanent: true },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/en" },
        { source: "/work/:slug", destination: "/en/work/:slug" },
        { source: "/opengraph-image", destination: "/en/opengraph-image" },
      ],
    };
  },
};

export default nextConfig;
