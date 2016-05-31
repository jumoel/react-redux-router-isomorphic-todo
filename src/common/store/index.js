import { createStore, applyMiddleware, compose } from 'redux';
import todoApp from './reducers';
import thunkMiddleware from 'redux-thunk';

export function configureStore(initialState) {
	let middleware = [thunkMiddleware];
	const { NODE_ENV, BROWSER } = process.env;

	let devTools = f => f;

	if (NODE_ENV !== 'production' && BROWSER) {
		const loggerMiddleware = require('redux-logger')({ collapsed: true });

		middleware.push(loggerMiddleware);

		if (typeof window.devToolsExtension !== 'undefined') {
			devTools = window.devToolsExtension();
		}
	}

	return createStore(
		todoApp,
		initialState,
		compose(applyMiddleware(...middleware), devTools)
	);
}
