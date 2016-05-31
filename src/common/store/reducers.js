import { combineReducers } from 'redux';

import { ADD_TODO_REQUEST, ADD_TODO_FAILURE, ADD_TODO_SUCCESS } from './actions';
import { TOGGLE_TODO_REQUEST, TOGGLE_TODO_FAILURE, TOGGLE_TODO_SUCCESS } from './actions';
import { DELETE_TODO_REQUEST, DELETE_TODO_FAILURE, DELETE_TODO_SUCCESS } from './actions';
import { FETCH_TODOS_REQUEST, FETCH_TODOS_FAILURE, FETCH_TODOS_SUCCESS } from './actions';
import { SET_VISIBILITY_FILTER, VisibilityFilters } from './actions';
const { SHOW_ALL } = VisibilityFilters;

function visibilityFilter(state = SHOW_ALL, action) {
	switch(action.type) {
		case SET_VISIBILITY_FILTER:
			return action.filter;
		default:
			return state;
	}
}

function todos(state = [], action) {
	switch(action.type) {
		case FETCH_TODOS_SUCCESS:
			return [...action.todos];
		case ADD_TODO_SUCCESS:
			return [
				...state,
				{ id: action.id, text: action.text, completed: false },
			];
		case TOGGLE_TODO_REQUEST:
		case DELETE_TODO_REQUEST:
			return state.map(todo => {
				if (todo.id === action.id) {
					return Object.assign({}, todo, { updating: true });
				}

				return todo;
			});
		case TOGGLE_TODO_FAILURE:
		case DELETE_TODO_FAILURE:
			return state.map(todo => {
				if (todo.id === action.id) {
					return Object.assign({}, todo, { updating: false });
				}

				return todo;
			});
		case TOGGLE_TODO_SUCCESS:
			return state.map(todo => {
				if (todo.id === action.id) {
					return Object.assign({}, action.todo, { updating: false });
				}

				return todo;
			});
		case DELETE_TODO_SUCCESS:
			return [...state].filter(todo => todo.id !== action.id);
		default:
			return state;
	}
}

const defaultAppState = {
	loading: false,
	savingTodo: false,
	textFieldContent: '',
	errorMessage: '',
};
function app(state = defaultAppState, action) {
	switch (action.type) {
		case FETCH_TODOS_REQUEST:
			return Object.assign({}, state, { loading: true });
		case FETCH_TODOS_FAILURE:
			return Object.assign({}, state, {
				loading: false,
				errorMessage: `Error fetching todos: ${action.error.message}`,
			});
		case FETCH_TODOS_SUCCESS:
			return Object.assign({}, state, {
				loading: false,
				errorMessage: '',
			});
		case ADD_TODO_REQUEST:
			return Object.assign({}, state, {
				savingTodo: true,
				textFieldContent: action.text,
			});
		case ADD_TODO_FAILURE:
			return Object.assign({}, state, {
				savingTodo: false,
				textFieldContent: action.text,
				errorMessage: `Error adding todo: ${action.error.message}`,
			});
		case ADD_TODO_SUCCESS:
			return Object.assign({}, state, {
				savingTodo: false,
				textFieldContent: '',
				errorMessage: '',
			});
		case TOGGLE_TODO_FAILURE:
			return Object.assign({}, state, {
				errorMessage: `Error toggling todo: ${action.error.message}`,
			});
		case TOGGLE_TODO_SUCCESS:
			return Object.assign({}, state, {
				errorMessage: '',
			});
		default:
			return state;
	}
}

const todoApp = combineReducers({
	app,
	visibilityFilter,
	todos,
});

export default todoApp;
