const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const app = require('../src/app');

let server;
let baseUrl;

before(async () => {
  await new Promise(resolve => {
    server = app.listen(0, '127.0.0.1', resolve);
  });

  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close(err => err ? reject(err) : resolve());
  });
});

test('GET /health returns OK', async () => {
  const response = await fetch(`${baseUrl}/health`);

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: 'ok' });
});

test('POST /tasks creates a task', async () => {
  const response = await fetch(`${baseUrl}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'Learn Jenkins' })
  });

  const task = await response.json();

  assert.equal(response.status, 201);
  assert.equal(task.title, 'Learn Jenkins');
  assert.equal(task.completed, false);
});

test('GET /tasks returns created tasks', async () => {
  const response = await fetch(`${baseUrl}/tasks`);
  const tasks = await response.json();

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(tasks));
});

test('POST /tasks rejects empty titles', async () => {
  const response = await fetch(`${baseUrl}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: '' })
  });

  assert.equal(response.status, 400);
});
