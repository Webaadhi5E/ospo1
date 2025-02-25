const isProd = process.env.NODE_ENV === "production";
const repoName = "ospo1"; // Change this if the repo name differs

module.exports = {
  output: "export", // Ensures static export for GitHub Pages
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",
  trailingSlash: true, // Ensures correct paths for static exports
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? `/${repoName}` : "",
  },
  images: {
    unoptimized: true, // Fixes image loading issues on GitHub Pages
  },
};
