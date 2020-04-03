const tasksRepo = require('./task.memory.repository');
const taskValidator = require('./task.validator');

const getAll = boardId => {
  const tasks = tasksRepo.getAll(boardId);
  if (tasks) {
    return { code: 200, body: tasks };
  }
  return { code: 404, body: 'NOT_FOUNDED' };
};

const createTask = ({ boardId, taskData }) => {
  const error = taskValidator.checkTaskData(taskData);
  console.log(error);
  if (error) {
    return { code: error.statusCode, body: error.message };
  }
  const task = tasksRepo.createTask({ boardId, taskData });
  return { code: 200, body: task };
};

module.exports = { getAll, createTask };
