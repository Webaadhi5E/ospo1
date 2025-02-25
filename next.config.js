const webpack = require("webpack");

module.exports = {
  output: "export",
  trailingSlash: true, // Ensures all static routes end with a `/`
  images: {
    unoptimized: true, // Fixes `next/image` issues in static exports
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
        "process.env.ASSET_PREFIX": JSON.stringify(""), // Ensures no prefix is added
      })
    );

    // Ensure Webpack resolves modules correctly
    if (config.resolve) {
      config.resolve.modules.push(__dirname);

      // Remove Webpack 4 fallback issues
      if (config.resolve.fallback) {
        delete config.resolve.fallback;
      }
    }

    // Add support for importing SVGs as React components
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        { loader: "babel-loader" },
        { loader: "react-svg-loader", options: { jsx: true } },
      ],
    });

    return config;
  },
  devIndicators: {
    autoPrerender: false,
  },
};
