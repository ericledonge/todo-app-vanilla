const PORT = process.env.PORT ?? 8000;

const express = require('express');

const app = express();

const pool = require('./db');

// get all todos
app.get('/todos', async (req, res) => {
  const user_id = 1;

  try {
    const todos = await pool.query('SELECT * FROM todos WHERE user_id = $1', [user_id]);
    res.json(todos.rows);
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
