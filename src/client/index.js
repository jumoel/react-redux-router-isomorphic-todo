import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { StyleSheet } from 'aphrodite';
import Root from 'client/Root';
import { configureStore } from 'common/store';

const initialState = window._initialState;
let store = configureStore(initialState);

const render = (RootComponent) => {
	ReactDOM.render(
		<AppContainer>
			<RootComponent store={store} />
		</AppContainer>,
		document.getElementById('root')
	);
};

StyleSheet.rehydrate(window._renderedClassNames);
render(Root);

if (module.hot) {
	module.hot.accept([
		'client/Root',
	], () => render(require('client/Root').default));
}
