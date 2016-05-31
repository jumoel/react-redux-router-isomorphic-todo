import fetch from 'isomorphic-fetch';

export const ADD_TODO_REQUEST = 'ADD_TODO_REQUEST';
export const ADD_TODO_FAILURE = 'ADD_TODO_FAILURE';
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS';

export const TOGGLE_TODO_REQUEST = 'TOGGLE_TODO_REQUEST';
export const TOGGLE_TODO_FAILURE = 'TOGGLE_TODO_FAILURE';
export const TOGGLE_TODO_SUCCESS = 'TOGGLE_TODO_SUCCESS';

export const DELETE_TODO_REQUEST = 'DELETE_TODO_REQUEST';
export const DELETE_TODO_FAILURE = 'DELETE_TODO_FAILURE';
export const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS';

export const FETCH_TODOS_REQUEST = 'FETCH_TODOS_REQUEST';
export const FETCH_TODOS_FAILURE = 'FETCH_TODOS_FAILURE';
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';

export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

export const VisibilityFilters = {
	SHOW_ALL: 'SHOW_ALL',
	SHOW_COMPLETED: 'SHOW_COMPLETED',
	SHOW_ACTIVE: 'SHOW_ACTIVE',
};

export function setVisibilityFilter(filter) {
	return { type: SET_VISIBILITY_FILTER, filter };
}


// ASYNC ACTIONS BELOW

const headers = {
	'Accept': 'application/json',
	'Content-Type': 'application/json',
};

const checkHTTPStatus = (response) => {
	const { status } = response;

	if (status >= 200 && status < 300) {
		return response;
	} else {
		let error = new Error(response.statusText);
		error.response = response;

		throw error;
	}
};

export function addTodo(text) {
	return (dispatch) => {
		dispatch(addTodoRequest(text));

		const method = 'POST';
		const body = JSON.stringify({ text });

		return fetch('/api/todos', { headers, method, body })
			.then(checkHTTPStatus)
			.then(res => res.json())
			.then(newTodo => dispatch(addTodoSuccess(newTodo)))
			.catch(error => dispatch(addTodoFailure(text, error)));
	};
}
function addTodoRequest(text) {
	return { type: ADD_TODO_REQUEST, text };
}
function addTodoFailure(text, error) {
	return { type: ADD_TODO_FAILURE, text, error };
}
function addTodoSuccess(newTodo) {
	return { type: ADD_TODO_SUCCESS, ...newTodo };
}

export function toggleTodo(id) {
	return (dispatch, getState) => {
		dispatch(toggleTodoRequest(id));

		const todo = getState().todos.find(t => t.id === id);

		const body = JSON.stringify(Object.assign({}, todo, {
			completed: !todo.completed,
		}));

		const method = 'PUT';

		return fetch(`/api/todos/${id}`, { headers, method, body })
			.then(checkHTTPStatus)
			.then(res => res.json())
			.then(updatedTodo => dispatch(toggleTodoSuccess(updatedTodo)))
			.catch(error => dispatch(toggleTodoFailure(todo, error)));
	};
}
function toggleTodoRequest(id) {
	return { type: TOGGLE_TODO_REQUEST, id };
}
function toggleTodoFailure(todo, error) {
	return { type: TOGGLE_TODO_FAILURE, id: todo.id, todo, error };
}
function toggleTodoSuccess(todo) {
	return { type: TOGGLE_TODO_SUCCESS, id: todo.id, todo };
}

export function deleteTodo(id) {
	return (dispatch) => {
		dispatch(deleteTodoRequest(id));

		const method = 'DELETE';

		return fetch(`/api/todos/${id}`, { headers, method })
			.then(checkHTTPStatus)
			.then(res => res.json())
			.then(({ id }) => dispatch(deleteTodoSuccess(id)))
			.catch(error => dispatch(deleteTodoFailure(id, error)));
	};
}
function deleteTodoRequest(text) {
	return { type: DELETE_TODO_REQUEST, text };
}
function deleteTodoFailure(id, error) {
	return { type: DELETE_TODO_FAILURE, id, error };
}
function deleteTodoSuccess(id) {
	return { type: DELETE_TODO_SUCCESS, id };
}

export function fetchTodos(serverOptions = {}) {
	return (dispatch) => {
		dispatch(fetchTodosRequest());

		const method = 'GET';

		let server = '';
		const { hostname, port } = serverOptions;
		if (hostname) {
			server = `http://${hostname}${port ? ':' + port : ''}`;
		}

		return fetch(`${server}/api/todos/`, { headers, method })
			.then(checkHTTPStatus)
			.then(res => res.json())
			.then(todos => todos.map(t => Object.assign({}, t, { completed: !!t.completed })))
			.then(todos => dispatch(fetchTodosSuccess(todos)))
			.catch(error => dispatch(fetchTodosFailure(error)));
	};
}
function fetchTodosRequest() {
	return { type: FETCH_TODOS_REQUEST };
}
function fetchTodosFailure(error) {
	return { type: FETCH_TODOS_FAILURE, error };
}
function fetchTodosSuccess(todos) {
	return { type: FETCH_TODOS_SUCCESS, todos };
}
