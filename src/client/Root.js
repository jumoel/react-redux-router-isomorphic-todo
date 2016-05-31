import React from 'react';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import { getRoutes } from 'common/routes';

const Root = ({ store }) => (
	<Provider store={store}>
		<Router history={browserHistory}>
			{ getRoutes() }
		</Router>
	</Provider>
);
Root.propTypes = {
	store: React.PropTypes.object.isRequired,
};

export default Root;
