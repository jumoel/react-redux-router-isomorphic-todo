import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'common/style';

export default class Base extends Component {
	static propTypes = { children: PropTypes.any };

	render() {
		return (
			<div className={css(styles.container)}>
				<div className={css(styles.content)}>
					{ this.props.children }
				</div>
			</div>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fefefe',
		height: '100%',
		padding: '1em',
		fontFamily: 'Sans-Serif',
	},
	content: {
    maxWidth: '100%',
    width: 600,
    margin: '0 auto',
    border: '1px solid #eee',
    padding: '1em',
    boxShadow: '0px 2px 10px #ccc',
    backgroundColor: '#fff',
	},
});
