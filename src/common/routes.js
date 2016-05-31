import React from 'react';
import { Route, IndexRoute } from 'react-router';

export function getRoutes() {
	const Base = require('common/pages/Base').default;
	const IndexPage = require('common/pages/Index').default;
	const NotFoundPage = require('common/pages/NotFound').default;

	return <Route path='/' component={Base}>
		<IndexRoute component={IndexPage} />
		<Route path='*' component={NotFoundPage}/>
	</Route>;
}
