import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Footer from 'common/components/Footer';
import AddTodo from 'common/containers/AddTodo';
import VisibleTodoList from 'common/containers/VisibleTodoList';
import Header from 'common/containers/Header';

class TodoApp extends Component {
	static propTypes = {
		loading: PropTypes.bool.isRequired,
	}

	render() {
		const { loading } = this.props;

		return (
			<div>
				<Header />
				<AddTodo />
				{ loading ? 'Loading...' : <VisibleTodoList /> }
				<Footer />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loading: state.app.loading,
	};
};

export default connect(
	mapStateToProps
)(TodoApp);
