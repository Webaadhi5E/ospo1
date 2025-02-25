const webpack = require('webpack');

const isProd = process.env.NODE_ENV === 'production';
const assetPrefix = isProd ? '/ospo1' : ''; // Adjust '/ospo1' to your repository name if different

module.exports = {
  output: 'export',
  assetPrefix: assetPrefix, // Use the defined assetPrefix
  trailingSlash: true, // Ensures all static routes end with a `/`
  images: {
    unoptimized: true, // Fixes `next/image` issues in static exports
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
        'process.env.ASSET_PREFIX': JSON.stringify(assetPrefix), // Define the ASSET_PREFIX environment variable
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
