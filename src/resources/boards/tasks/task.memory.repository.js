const Task = require('./task.model');

let tasks = [];

const getAll = async boardId => {
  const filtredTasks = tasks.filter(task => task.boardId === boardId);
  return filtredTasks;
};

const getTaskById = async ({ boardId, taskId }) => {
  const task = tasks
    .filter(el => el.boardId === boardId)
    .find(elem => elem.id === taskId);
  return task;
};

const createTask = async ({ boardId, taskData }) => {
  const newTask = new Task({ ...taskData, boardId });
  tasks.push(newTask);
  return newTask;
};

const updateTask = async ({ boardId, taskId, taskData }) => {
  const index = tasks.findIndex(
    task => task.boardId === boardId && task.id === taskId
  );
  if (index < 0) {
    return;
  }
  const newTask = new Task(taskData);
  newTask.id = taskId;
  newTask.boardId = boardId;
  tasks[index] = newTask;
  return newTask;
};

const deleteTask = async ({ boardId, taskId }) => {
  const index = tasks.findIndex(
    task => task.boardId === boardId && task.id === taskId
  );
  if (index < 0) {
    return;
  }
  tasks.splice(index, 1);
  return tasks;
};

const deleteAllBoardTasks = async ({ boardId }) => {
  tasks = [...tasks].filter(task => task.boardId !== boardId);
  return;
};

const deleteAllUserTasks = ({ userId }) => {
  tasks = [...tasks].map(task => {
    if (task.userId === userId) {
      task.userId = null;
    }
    return task;
  });
  return;
};

module.exports = {
  getAll,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  deleteAllBoardTasks,
  deleteAllUserTasks
};
