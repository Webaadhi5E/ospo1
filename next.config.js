const webpack = require('webpack');

const isProd = process.env.NODE_ENV === 'production';
// Remove the leading slash to prevent double slashes in URLs
const assetPrefix = isProd ? 'ospo1' : '';

module.exports = {
  output: 'export',
  basePath: isProd ? '/ospo1' : '', // Add this line to handle base routing
  assetPrefix: isProd ? '/ospo1' : '', // Update this to include the leading slash
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
        // Remove the leading slash here as it will be added by the router
        'process.env.ASSET_PREFIX': JSON.stringify(''),
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
