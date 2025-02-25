const webpack = require("webpack");
const isProd = process.env.NODE_ENV === "production";

// Set the asset prefix correctly for production and local development
const assetPrefix = isProd ? "/ospo1" : "";

module.exports = {
  output: "export",
  assetPrefix,
  trailingSlash: true, // Ensures all static routes end with a `/`
  
  publicRuntimeConfig: {
    assetPrefix, // Expose assetPrefix to the client
  },

  images: {
    unoptimized: true, // Fixes `next/image` for static exports
  },

  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
    url: false,
  },

  webpack: (config, { isServer }) => {
    // Define ASSET_PREFIX globally
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.ASSET_PREFIX": JSON.stringify(assetPrefix),
      })
    );

    // Prevent `fs` module issues in client-side builds
    if (!isServer) {
      config.resolve.fallback = { fs: false };
    }

    // SVG Loader for importing SVGs as React components
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
