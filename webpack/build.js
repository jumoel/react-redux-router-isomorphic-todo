/* eslint-disable no-console */
const webpack = require('webpack');
const clientConfig = require('./config.client').default;
const serverConfig = require('./config.server').default;
const writeFileSync = require('fs').writeFileSync;
const path = require('path');

const clientCompiler = webpack(clientConfig);
const serverCompiler = webpack(serverConfig);

const done = (project) => (err, stats) => {
  if (err) {
    console.error(err);
    return;
  }

  const folder = path.resolve(__dirname + `/../dist/${project}`);

	const { publicPath, assetsByChunkName } = stats.toJson();

  writeFileSync(folder + '/.stats.json', JSON.stringify({ publicPath, assetsByChunkName}, null, 2));
};
serverCompiler.run(done('server'));
clientCompiler.run(done('client'));
