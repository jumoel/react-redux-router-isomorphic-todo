import express from 'express';
import bodyParser from 'body-parser';

const app = express.Router();
const pgp = require('pg-promise')();

const cn = {
	host: 'db', // server name or IP address;
	port: 5432,
	database: 'todo',
	user: 'todo',
	password: 'todo',
};

app.use(bodyParser.json());

app.use((req, res, next) => {
	if (!req.app.locals.db) {
		req.app.locals.db = pgp(cn);
	}

	next();
});

const serverError = (res, message) => (details) => res.status(500).json({
	error: 'internal server error',
	message,
	details,
});

app.get('/todos', function(req, res) {
	const { db } = req.app.locals;

	db.any({
		name: 'find-todos',
		text: 'SELECT * FROM todos ORDER BY id ASC',
	})
	.then(list => res.json(list))
	.catch(serverError(res, 'could not find todos'));
});

app.post('/todos', function(req, res) {
	const { db } = req.app.locals;
	const { text } = req.body;

	db.one({
		name: 'create-todo',
		text: 'INSERT INTO todos (text) VALUES($1) RETURNING *',
		values: [text],
	})
	.then((todo) => res.json(todo))
	.catch(serverError(res));
});

app.put('/todos/:todoId', function(req, res) {
	const { db } = req.app.locals;
	const { todoId } = req.params;
	const { text, completed } = req.body;

	db.one({
		name: 'update-todo',
		text: 'UPDATE todos SET text = $2, completed = $3 WHERE id = $1 RETURNING *',
		values: [todoId, text, completed],
	})
	.then(todo => res.json(todo))
	.catch(serverError(res, 'could not find todo'));
});

app.delete('/todos/:todoId', function(req, res) {
	const { db } = req.app.locals;
	const { todoId } = req.params;

	db.one({
		name: 'delete-todo',
		text: 'DELETE FROM todos WHERE id = $1 RETURNING *',
		values: [todoId],
	})
	.then(({ id }) => res.json({ id, status: 'deleted' }))
	.catch(serverError(res, 'could not find todo'));
});

app.get('*', (req, res) => {
	res.status(404).json({ status: 'not found' });
});

app.use((error, req, res, next) => {
	if (error) {
		res.status(error.status || 500).json({ error: error.body });
	} else {
		next();
	}
});

export default app;
