const isProd = process.env.NODE_ENV === "production";
const assetPrefix = isProd ? "/ospo1" : ""; // Prefix applies to assets, NOT links

module.exports = {
  output: "export",
  assetPrefix, // Use only for assets, not internal routing
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.ASSET_PREFIX": JSON.stringify(assetPrefix),
      })
    );
    return config;
  },
  basePath: isProd ? "/ospo1" : "", // Ensures pages resolve correctly
  devIndicators: {
    autoPrerender: false,
  },
};
