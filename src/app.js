const express = require('express');
const { isValidTitle, createTask } = require('./taskService');

const app = express();
app.use(express.json());

const tasks = [];

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  if (!isValidTitle(req.body?.title)) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const task = createTask(tasks.length + 1, req.body.title);
  tasks.push(task);

  res.status(201).json(task);
});

module.exports = app;
