import { connect } from 'react-redux';
import { toggleTodo, deleteTodo, VisibilityFilters } from 'common/store/actions';
import TodoList from 'common/components/TodoList';

const getVisibleTodos = (todos, filter) => {
	switch (filter) {
		case VisibilityFilters.SHOW_ALL:
			return todos;
		case VisibilityFilters.SHOW_ACTIVE:
			return todos.filter(t => !t.completed);
		case VisibilityFilters.SHOW_COMPLETED:
			return todos.filter(t => t.completed);
	}
};

const mapStateToProps = (state) => {
	return {
		todos: getVisibleTodos(state.todos, state.visibilityFilter),
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onTodoClick: (id) => { dispatch(toggleTodo(id)); },
		onTodoDeleteClick: (id) => { dispatch(deleteTodo(id)); },
	};
};

const VisibleTodoList = connect(
	mapStateToProps,
	mapDispatchToProps
)(TodoList);

export default VisibleTodoList;
