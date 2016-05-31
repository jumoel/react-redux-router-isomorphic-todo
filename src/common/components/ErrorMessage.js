import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';

export default class ErrorMessage extends Component {
	static propTypes = {
		message: PropTypes.string.isRequired,
	}

	render() {
		const { message } = this.props;

		if (!message) { return null; }

		return <p className={css(styles.errorMessage)}>{ message }</p>;
	}
}

const styles = StyleSheet.create({
	errorMessage: {
		color: 'red',
		fontWeight: 'bold',
	},
});
