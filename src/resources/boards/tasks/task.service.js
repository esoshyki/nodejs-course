const taskValidator = require('./task.validator');
const taskMongoose = require('./task.mongoose');

const getAll = async ({ boardId, res }) => {
  return await taskMongoose.getAll({ boardId, res });
};

const getTaskById = async ({ boardId, taskId, res }) => {
  return await taskMongoose.getTaskById({ boardId, taskId, res });
};

const createTask = async ({ boardId, taskData, res }) => {
  const error = await taskValidator.checkTaskData({ taskData });
  if (error) {
    return res.status(error.statusCode).json(error.message);
  }
  return await taskMongoose.createTask({ boardId, taskData, res });
};

const updateTask = async ({ boardId, taskId, taskData, res }) => {
  const error = await taskValidator.checkTaskData({ taskData });
  if (error) {
    return res.status(error.statusCode).json(error.message);
  }
  return await taskMongoose.updateTask({ boardId, taskId, taskData, res });
};

const deleteTask = async ({ boardId, taskId, res }) => {
  return await taskMongoose.deleteTask({ boardId, taskId, res });
};

module.exports = { getAll, createTask, getTaskById, updateTask, deleteTask };
