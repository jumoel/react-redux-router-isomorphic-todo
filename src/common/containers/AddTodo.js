import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'common/style';

import { addTodo } from 'common/store/actions';

class AddTodo extends Component {
	static propTypes = {
		onSubmit: PropTypes.func.isRequired,
		value: PropTypes.string.isRequired,
		submitting: PropTypes.bool.isRequired,
	};

	constructor(props) {
		super(props);

		this.state = {
			value: props.value,
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInput = this.handleInput.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		const { value } = nextProps;
		this.setState({ value });
	}

	handleSubmit(e) {
		e.preventDefault();

		const { onSubmit } = this.props;
		const { value } = this.state;

		if (!value.trim()) {
			return;
		}

		onSubmit(value);
	}

	handleInput(e) {
		const { value } = e.target;

		this.setState({ value });
	}

	render() {
		const { submitting } = this.props;

		return (
			<div className={css(styles.container)}>
				<form onSubmit={this.handleSubmit} className={css(styles.form)}>
					<input className={css(styles.input)}
						placeholder='What do you need to do?'
						value={this.state.value}
						onInput={this.handleInput}
						disabled={submitting}
					/>
					<button className={css(styles.button)}
						type='submit'
						disabled={submitting}
					>💾</button>
				</form>
			</div>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		fontSize: '2rem',
		margin: '0.5em 0',
	},
	form: {
		display: 'flex',
		justifyContent: 'center',
	},
	input: {
		fontSize: '1em',
		padding: '0.2em',
		borderBottom: '2px solid #ccc',
		flex: '1 1 auto',
	},
	button: {
		fontSize: '1em',
		width: '2em',
		flex: '0 0 auto',
		padding: '0.2em',
		border: 0,
	},
});

const mapStateToProps = (state) => {
	return {
		value: state.app.textFieldContent,
		submitting: state.app.savingTodo,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onSubmit: (text) => dispatch(addTodo(text)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddTodo);
