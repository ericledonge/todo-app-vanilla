const PORT = process.env.PORT ?? 8000;

const express = require('express');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const pool = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

// get all todos
app.get('/todos/:userId', async (req, res) => {
  console.log("get all todos");
  const { userId } = req.params;

  try {
    const todos = await pool.query('SELECT * FROM todos WHERE user_id = $1 ORDER BY creation_date ASC', [userId]);
    res.json(todos.rows);
  } catch (error) {
    console.error(error);
  }
});

// create a todo
app.post('/todos', async (req, res) => {
  console.log("create a todo");
  const { user_id, title, is_done } = req.body;
  const id = uuidv4();

  try {
    const newTodo = await pool.query(`INSERT INTO todos (id, user_id, title, is_done, creation_date) VALUES ($1, $2, $3, $4, now())`, [id, user_id, title, is_done]);
    res.json(newTodo);
  } catch (error) {
    console.error(error);
  }
});

// toggle a todo
app.patch('/todos/:id', async (req, res) => {
  console.log("toggle a todo");
  const { id } = req.params;
  const { is_done } = req.body;

  try {
    const toggleTodo = await pool.query('UPDATE todos SET is_done = $1 WHERE id = $2', [is_done, id]);
    res.json(toggleTodo);
  } catch (error) {
    console.error(error);
  }
});

// delete a todo
app.delete('/todos/:id', async (req, res) => {
  console.log("delete a todo");
  const { id } = req.params;

  try {
    const deleteTodo = await pool.query('DELETE FROM todos WHERE id = $1', [id]);
    res.json(deleteTodo);
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
