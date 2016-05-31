import path from 'path';
import webpack from 'webpack';

import { ROOT_PATH, PRODUCTION, filterFalsy } from './vars';

const assetFilename = !PRODUCTION ? '[name].js' : '[name].bundle.[hash].js';

const config = {
	target: 'web',

	devtool: !PRODUCTION ? '#eval' : '#cheap-module-source-map',
	entry: {
		vendor: ['react', 'react-router', 'aphrodite', 'redux', 'react-redux'],

		index: filterFalsy([
			!PRODUCTION && 'webpack-hot-middleware/client',
			!PRODUCTION && 'react-hot-loader/patch',
			'./src/client/index',
		]),
	},
	output: {
		path: path.join(ROOT_PATH, 'dist/client'),
		filename: assetFilename,
		publicPath: '/static/',
	},
	plugins: filterFalsy([
		new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
				'BROWSER': JSON.stringify(true),
      },
    }),

		!PRODUCTION && new webpack.HotModuleReplacementPlugin(),

		PRODUCTION && new webpack.optimize.OccurenceOrderPlugin(),
		PRODUCTION && new webpack.optimize.DedupePlugin(),
		PRODUCTION && new webpack.optimize.CommonsChunkPlugin('vendor', assetFilename),
		PRODUCTION && new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			comments: false,
			mangle: true,
			mangleProps: true,
			compress: {
				dead_code: true,
				if_return: true,
				keep_fnames: true,
			},
		}),
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
			loaders: [ 'babel' ],
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
