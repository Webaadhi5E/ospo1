const webpack = require("webpack");

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  output: "export",
  assetPrefix: isProd ? "/ospo1" : "", // ✅ Correctly handles GitHub Pages prefix
  trailingSlash: true, // ✅ Ensures all static routes end with `/` for GitHub Pages

  images: {
    unoptimized: true, // ✅ Fixes `next/image` issue in static exports
  },

  webpack: (config, { isServer }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.ASSET_PREFIX": JSON.stringify(isProd ? "/ospo1" : ""),
      })
    );

    // ✅ Ensure Webpack resolves modules correctly
    if (config.resolve) {
      config.resolve.modules.push(__dirname);
    }

    // ✅ Add support for importing SVGs as React components using `@svgr/webpack`
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },

  devIndicators: {
    autoPrerender: false,
  },
};
