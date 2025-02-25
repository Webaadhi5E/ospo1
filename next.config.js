const isProd = process.env.NODE_ENV === "production";
const repoName = "ospo1"; // Update with your GitHub repository name

module.exports = {
  assetPrefix: isProd ? `/${repoName}` : "",
  images: {
    unoptimized: true, // Disable Next.js image optimization for GitHub Pages
  },
  webpack: (config) => {
    config.resolve.modules.push(__dirname);
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        { loader: "babel-loader" },
        {
          loader: "react-svg-loader",
          options: { jsx: true },
        },
      ],
    });

    return config;
  },
  devIndicators: { autoPrerender: false },
};
