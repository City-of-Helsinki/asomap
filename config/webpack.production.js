const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');

const common = require('./webpack.common');

module.exports = merge(common, {
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, '../app/index.js'),
  ],
  debug: false,
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/_assets/',
    filename: 'app.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, '../app'),
        loader: 'babel',
        query: {
          presets: ['es2015', 'node6', 'react', 'stage-2'],
        },
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss-loader'),
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss-loader!less'),
      },
    ],
  },
  plugins: [
    // Important to keep React file size down
    new webpack.DefinePlugin({
      __API_URL__: JSON.stringify(process.env.API_URL || 'https://api.hel.fi/respa/v1'),
      __DEVTOOLS__: false,
      __TRACKING__: Boolean(process.env.PIWIK_SITE_ID),
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false,
      },
    }),
    new ExtractTextPlugin('app.css'),
  ],
});
