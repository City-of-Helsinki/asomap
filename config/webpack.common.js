const path = require('path');

const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.png$/,
        loader: 'url?limit=100000&mimetype=image/png',
      },
      {
        test: /\.gif$/,
        loader: 'url?limit=100000&mimetype=image/gif',
      },
      {
        test: /\.ico$/,
        loader: 'url?limit=100000&mimetype=image/x-icon',
      },
      {
        test: /\.jpg$/,
        loader: 'file?name=[name].[ext]',
      },
      {
        test: /\.woff|\.woff2|\.svg|.eot|\.ttf/,
        loader: 'url?prefix=font/&limit=10000',
      },
    ],
  },
  postcss: [
    autoprefixer({ browsers: ['last 2 version'] }),
  ],
  resolve: {
    alias: {
      app: path.resolve(__dirname, '../app'),
    },
    extensions: ['', '.js', '.json'],
    modulesDirectories: ['node_modules', 'app'],
  },
  plugins: [
    new webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    }),
    new HtmlWebpackPlugin({
      favicon: path.resolve(__dirname, '../app/assets/images/favicon.ico'),
      template: path.resolve(__dirname, '../app/index.template.html'),
    }),
  ],
};
