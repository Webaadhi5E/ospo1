const webpack = require("webpack");

module.exports = {
  output: "export",
  assetPrefix: process.env.NODE_ENV === "production" ? "/community" : "", // Ensure correct prefix for production
  trailingSlash: true,
  images: {
    unoptimized: true, // Fixes image loading in static export
  },
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
    url: false,
  },
  webpack: (config) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.ASSET_PREFIX": JSON.stringify(process.env.NODE_ENV === "production" ? "/community" : ""),
      })
    );

    // Remove Webpack 4 fallback issues
    if (config.resolve && config.resolve.fallback) {
      delete config.resolve.fallback;
    }

    return config;
  },
  devIndicators: {
    autoPrerender: false,
  },
};
