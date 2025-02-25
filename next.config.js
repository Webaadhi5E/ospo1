const webpack = require("webpack");

const assetPrefix = "/";

module.exports = {
  output: "export",
  assetPrefix,
  trailingSlash: true,

  publicRuntimeConfig: {
    assetPrefix,
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

  webpack: (config, { isServer }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.ASSET_PREFIX": JSON.stringify(""),
      })
    );

    if (!isServer) {
      config.resolve.fallback = { fs: false };
    }

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
