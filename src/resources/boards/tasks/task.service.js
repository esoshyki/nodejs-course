const tasksRepo = require('./task.memory.repository');
const taskValidator = require('./task.validator');
const errors = require('../../errors');

const getAll = async boardId => {
  try {
    const tasks = await tasksRepo.getAll(boardId);
    return { code: 200, body: tasks };
  } catch (err) {
    return { code: 400, body: err.message };
  }
};

const getTaskById = async ({ boardId, taskId }) => {
  const task = await tasksRepo.getTaskById({ boardId, taskId });
  if (task) {
    return { code: 200, body: task };
  }
  return {
    code: errors.TASK_NOT_FOUND.statusCode,
    body: errors.TASK_NOT_FOUND.message
  };
};

const createTask = async ({ boardId, taskData }) => {
  const error = await taskValidator.checkTaskData({ taskData });
  if (error) {
    return { code: error.code, body: error.body };
  }
  const task = await tasksRepo.createTask({ boardId, taskData });
  return { code: 200, body: task };
};

const updateTask = async ({ boardId, taskId, taskData }) => {
  const error = await taskValidator.checkTaskData({ taskData });
  if (error) {
    return { code: error.code, body: error.body };
  }
  const task = await tasksRepo.updateTask({ boardId, taskId, taskData });
  return { code: 200, body: task };
};

const deleteTask = async ({ boardId, taskId }) => {
  const tasks = await tasksRepo.deleteTask({ boardId, taskId });
  return { code: 200, body: tasks };
};

module.exports = { getAll, createTask, getTaskById, updateTask, deleteTask };
