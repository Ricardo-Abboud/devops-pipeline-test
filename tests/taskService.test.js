const test = require('node:test');
const assert = require('node:assert/strict');
const { isValidTitle, createTask } = require('../src/taskService');

test('accepts valid task titles', () => {
  assert.equal(isValidTitle('Learn Jenkins'), true);
});

test('rejects empty task titles', () => {
  assert.equal(isValidTitle('   '), false);
});

test('creates a task correctly', () => {
  const task = createTask(1, ' Learn Jenkins ');

  assert.deepEqual(task, {
    id: 1,
    title: 'Learn Jenkins',
    completed: false
  });
});

test('throws an error for invalid titles', () => {
  assert.throws(
    () => createTask(1, ''),
    /Title is required/
  );
});
