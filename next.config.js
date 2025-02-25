const webpack = require("webpack");

module.exports = {
  output: "export",
  assetPrefix: "/",
  trailingSlash: true,
  future: {
    webpack5: true, // Ensure Webpack 5 is used
  },
  publicRuntimeConfig: {
    assetPrefix: "/",
  },
  images: {
    unoptimized: true,
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
        "process.env.ASSET_PREFIX": JSON.stringify(""),
      })
    );

    return config;
  },
  devIndicators: {
    autoPrerender: false,
  },
};
