import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Mount the app at /care (no redirects; URL stays /care/…)
  basePath: "/care",
  env: {
    NEXT_PUBLIC_BASE_PATH: "/care",
  },

  // Good production defaults
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  // Easiest way to run with `npm run start` or via systemd
  output: "standalone",

  // Keep your current build relaxations
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // Image optimizer works under /care by default.
  // Uncomment if you prefer to skip optimization:
  // images: { unoptimized: true },

  // If you use rewrites/redirects, they’ll be relative to /care automatically.
};

export default nextConfig;
