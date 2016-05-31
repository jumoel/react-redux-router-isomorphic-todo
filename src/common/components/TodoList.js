import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'common/style';

import Todo from 'common/components/Todo';

export default class TodoList extends Component {
	static propTypes = {
		todos: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.number.isRequired,
			completed: PropTypes.bool.isRequired,
			text: PropTypes.string.isRequired,
		})),
		onTodoClick: PropTypes.func.isRequired,
		onTodoDeleteClick: PropTypes.func.isRequired,
	};

	render() {
		const { todos, onTodoClick, onTodoDeleteClick } = this.props;

		return <ul className={css(styles.list)}>
			{todos.map((todo) =>
				<li key={todo.id} className={css(styles.item)}>
					<Todo {...todo}
						onClick={() => onTodoClick(todo.id)}
						onDeleteClick={() => onTodoDeleteClick(todo.id)}
					/>
				</li>
			)}
		</ul>;
	}
}

const styles = StyleSheet.create({
	list: {
		marginBottom: '1em',
	},
	item: {
		display: 'block',
	},
});
