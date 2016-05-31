import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'common/style';

const Todo = ({ onClick, onDeleteClick, completed, text, updating }) => {
	const wrap = (cb) => () => {
		if (updating) { return; }
		cb();
	};

	const confirmingOnDeleteClick = () => {
		window.confirm('Are you sure you want to delete the todo?') && onDeleteClick();
	};

	return (
		<div className={css(styles.container)}>
			<div onClick={wrap(onClick)} className={css(styles.todo, updating && styles.updating)}>
				<div className={css(styles.indicator)}>
					{completed ? '👏' : '❕'}
				</div>
				<div className={css(styles.text, completed && styles.completed)}>
					{text}
				</div>
			</div>
			<button className={css(styles.button)}
				onClick={wrap(confirmingOnDeleteClick)}
			>❌</button>
		</div>
	);
};
Todo.propTypes = {
	onClick: PropTypes.func.isRequired,
	onDeleteClick: PropTypes.func.isRequired,
	completed: PropTypes.bool.isRequired,
	updating: PropTypes.bool,
	text: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
	todo: {
		display: 'flex',
		flex: '1 1 auto',
		alignItems: 'baseline',
	},
	loading: {
		opacity: 0.2,
	},
	completed: {
		textDecoration: 'line-through',
	},
	button: {
		paddingLeft: '0.5em',
		border: 0,
		flex: '0 0 auto',
	},
	indicator: {
		paddingRight: '0.5em',
		flex: '0 0 auto',
	},
	container: {
		display: 'flex',
		alignItems: 'baseline',
	},
});

export default Todo;
