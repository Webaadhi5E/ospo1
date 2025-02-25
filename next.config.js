const isProd = process.env.NODE_ENV === "production";
const repoName = "ospo1";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // Set the correct base path for GitHub Pages
  assetPrefix: isProd ? `/${repoName}/` : "",
  basePath: isProd ? `/${repoName}` : "",

  // Ensure trailing slashes for correct routing on GitHub Pages
  trailingSlash: true,

  // Disable Image Optimization for GitHub Pages
  images: {
    unoptimized: true,
  },

  // Handle static file routing issues
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = { fs: false };
    }
    return config;
  },
};

module.exports = nextConfig;
