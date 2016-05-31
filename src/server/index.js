import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';
import { StyleSheetServer } from 'aphrodite';

import { configureStore } from 'common/store';

const page = ({ head, css, content, bundlePaths, initialState }) => `
	<!doctype html>
	<html ${head.htmlAttributes.toString()}>
		<head>
			${head.title.toString()}${head.meta.toString()}${head.link.toString()}
			<style>
				html,body,#root{width:100%;height:100%;}
				html,body,body *{margin:0;padding:0;box-sizing:border-box;background-color:transparent;}
			</style>
			<style data-aphrodite>${css.content}</style>
		</head>
		<body>
			<div id="root">${content}</div>

			<script>window._renderedClassNames = ${JSON.stringify(css.renderedClassNames)};</script>
			<script>window._initialState = ${JSON.stringify(initialState)};</script>
			${ bundlePaths.map(bundle => `<script src="${bundle}"></script>`).join('') }
		</body>
	</html>
`;

const status = {
	OK: 200,
	NOT_FOUND: 404,
	MOVED_TEMPORARILY: 302,
	INTERNAL_SERVER_ERROR: 500,
};

const requestHandler = (bundlePaths) => (req, res) => {
	const { getRoutes } = require('common/routes');

	// Note that req.url here should be the full URL path from
	// the original request, including the query string.
	match({ routes: getRoutes(), location: req.url }, (error, redirectLocation, renderProps) => {
		if (error) {
			res.status(status.INTERNAL_SERVER_ERROR).send(error.message);
		} else if (redirectLocation) {
			res.redirect(status.MOVED_TEMPORARILY, redirectLocation.pathname + redirectLocation.search);
		} else {
			const notFound = renderProps.components.reduce(
				(val, component) => val || component.name === 'NotFound',
				false
			);

			const store = configureStore();

			const port = req.app.get('port');
			const hostname = req.app.get('hostname');

			store.dispatch(require('common/store/actions').fetchTodos({ hostname, port }))
			.then(() => {
				const { html, css } = StyleSheetServer.renderStatic(() => (
					renderToString(
						<Provider store={store}>
							<RouterContext {...renderProps} />
						</Provider>
					)
				));

				const head = Helmet.rewind();
				const initialState = store.getState();

				res.status(notFound ? status.NOT_FOUND : status.OK).send(page({
					content: html,
					bundlePaths,
					head,
					css,
					initialState,
				}));
			});
		}
	});
};

export default requestHandler;
