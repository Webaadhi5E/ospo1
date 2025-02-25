const webpack = require('webpack');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  output: "export", // Required for static exports like GitHub Pages
  assetPrefix: isProd ? "." : "", // Ensures relative asset loading
  trailingSlash: true, // Ensures consistency in static exports
  images: {
    unoptimized: true, // Fixes next/image issues on GitHub Pages
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
        'process.env.ASSET_PREFIX': JSON.stringify(isProd ? "." : ""),
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
