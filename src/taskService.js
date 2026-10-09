function isValidTitle(title) {
  return typeof title === 'string' && title.trim().length > 0;
}

function createTask(id, title) {
  if (!isValidTitle(title)) {
    throw new Error('Title is required');
  }

  return {
    id,
    title: title.trim(),
    completed: false
  };
}

module.exports = { isValidTitle, createTask };
