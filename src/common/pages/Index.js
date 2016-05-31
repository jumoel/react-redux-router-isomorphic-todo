import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'common/style';

import TodoApp from 'common/containers/TodoApp';

export default class Index extends Component {
	static propTypes = { children: PropTypes.any };

	render() {
		return <div>
			<h2 className={css(styles.header)}>
				GTL{' '}
				<mark className={css(styles.mark)}>(Global Todo List)</mark>
			</h2>
			<TodoApp />
		</div>;
	}
}

const styles = StyleSheet.create({
	header: {
		fontSize: '2rem',
	},
	mark: {
		fontFamily: 'cursive',
		fontStyle: 'italic',
		opacity: 0.5,
	},
});
