/* eslint-disable no-console */

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const config = require('../config/webpack.development');

const compiler = webpack(config);
const port = 3000;
const serverSettings = {
  hot: true,
  historyApiFallback: true,
  publicPath: config.output.publicPath,
  quiet: false,
  noInfo: false,
  stats: {
    assets: false,
    chunkModules: false,
    chunks: true,
    colors: true,
    hash: false,
    progress: false,
    timings: false,
    version: false,
  },
};

console.log('Starting development server...');

const server = new WebpackDevServer(compiler, serverSettings);

server.listen(port, 'localhost', (error) => { // eslint-disable-line
  if (error) {
    return console.log(error);
  }

  console.log(`Listening at http://localhost:${port}/`);
});
