const Task = require('./task.model');

const tasks = {};

const getAll = boardId => tasks[boardId];

const createTask = ({ boardId, taskData }) => {
  const newTask = new Task(taskData);
  console.log(newTask);
  if (tasks[boardId]) {
    tasks.boardId.push(newTask);
  } else {
    tasks.boardId = [newTask];
  }
  return newTask;
};

module.exports = { getAll, createTask };
