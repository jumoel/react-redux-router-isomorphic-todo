import React, { Component, PropTypes } from 'react';

export default class NotFound extends Component {
	static propTypes = { children: PropTypes.any };

	render() {
		return <div><h2>Aww Shucks! 😳</h2></div>;
	}
}
