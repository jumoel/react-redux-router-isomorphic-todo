import React, { Component } from 'react';
import FilterLink from 'common/containers/FilterLink';
import { VisibilityFilters } from 'common/store/actions';

export default class Footer extends Component {
	render() {
		return (
			<p>
				Show:
				{' '}
				<FilterLink filter={VisibilityFilters.SHOW_ALL}>
					All
				</FilterLink>
				{', '}
				<FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>
					Active
				</FilterLink>
				{', '}
				<FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>
					Completed
				</FilterLink>
			</p>
		);
	}
}

export default Footer;
