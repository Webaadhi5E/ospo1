const webpack = require('webpack');

const repoName = "ospo1"; // Change this to your GitHub repo name
const isProd = process.env.NODE_ENV === 'production';
const assetPrefix = isProd ? `/${repoName}` : "";

module.exports = {
  output: "export",
  assetPrefix,
  basePath: isProd ? `/${repoName}` : "",
  trailingSlash: true,
  images: {
    unoptimized: true, // Fixes `next/image` issues in static sites
  },
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[local]___[hash:base64:5]',
    url: false,
  },
  webpack: (config) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.ASSET_PREFIX': JSON.stringify(assetPrefix),
        'process.env.BASE_PATH': JSON.stringify(isProd ? `/${repoName}` : ""),
      })
    );

    config.resolve.modules.push(__dirname);

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        { loader: 'babel-loader' },
        { loader: 'react-svg-loader', options: { jsx: true } },
      ],
    });

    return config;
  },
  devIndicators: {
    autoPrerender: false,
  },
};
