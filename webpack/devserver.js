/* eslint-disable no-console */
import path from 'path';

import express from 'express';
import morgan from 'morgan';

import webpack from 'webpack';
import clientConfig from './config.client';
import serverConfig from './config.server';

const clientCompiler = webpack(clientConfig);
const serverCompiler = webpack(serverConfig);

const hostname = process.env.HOSTNAME || '0.0.0.0';
const port = process.env.PORT || 3000;

const app = express();
const logger = morgan('dev');
app.use(logger);

const devMiddlewareOpts = {
	publicPath: clientConfig.output.publicPath,
	hot: true,
	historyApiFallback: true,
	quiet: true,
	noInfo: false,
};

app.use(require('webpack-dev-middleware')(clientCompiler, devMiddlewareOpts));
app.use(require('webpack-hot-middleware')(clientCompiler));

serverCompiler.watch({}, (err) => { if (err) { console.error(err); } });

let assets = [];
clientCompiler.plugin('done', (stats) => {
	const { publicPath, assetsByChunkName } = stats.toJson();

	assets = Object.keys(assetsByChunkName)
		.map(key => assetsByChunkName[key])
		.map(assets => Array.isArray(assets) ? assets[0] : assets)
		.map(asset => publicPath + asset);
});

// This middleware ensures that the api is reloaded on every request.
function apiMiddleware(req, res) {
	const server = path.resolve(__dirname + '/../dist/server/api.js');
	delete require.cache[server];

	const apiServer = require(server).default;
	return apiServer(req, res);
}
app.use('/api', apiMiddleware);

// This middleware ensures that the server side is reloaded on every request.
function appMiddleware(req, res) {
	const server = path.resolve(__dirname + '/../dist/server/index.js');
	delete require.cache[server];

	const appServer = require(server).default;
	return appServer(assets)(req, res);
}
app.use(appMiddleware);

app.set('port', port);
app.set('hostname', hostname);
app.listen(port, hostname, (err) => {
	if (err) { console.error(err); }

	console.log('Listening at http://%s:%d', hostname, port);
});
