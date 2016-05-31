import path from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';

import { ROOT_PATH, PRODUCTION, filterFalsy } from './vars';

const config = {
	target: 'node',

	entry: {
		index: [
			'./src/server/index',
		],
		api: [
			'./src/server/api',
		],
	},
	output: {
		path: path.join(ROOT_PATH, 'dist/server'),
		filename: '[name].js',
    libraryTarget: 'commonjs2',
	},
	externals: [nodeExternals()],
	plugins: filterFalsy([
		new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
				'BROWSER': JSON.stringify(false),
      },
    }),

		PRODUCTION && new webpack.optimize.OccurenceOrderPlugin(),
		PRODUCTION && new webpack.optimize.DedupePlugin(),
	]),
	resolve: {
		extensions: ['', '.js', '.jsx'],
		root: [
			path.join(ROOT_PATH, 'src'),
		],
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			loaders: ['babel'],
			exclude: /node_modules/,
			include: path.join(ROOT_PATH, 'src'),
		},
		{
			test: /\.json$/,
			loaders: [ 'json' ],
		}],
	},
};

export default config;
