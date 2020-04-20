const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  order: Number,
  description: String,
  columnId: String,
  userId: String,
  boardId: String
});

const toResponse = task => {
  const { title, order, description, columnId, userId, boardId, _id } = task;
  return { title, order, description, columnId, userId, boardId, id: _id };
};

const Task = mongoose.model('Task', taskSchema);

const getAll = async ({ boardId, res }) => {
  Task.find({ boardId }, (err, tasks) => {
    if (err) {
      return res.status(500).json(err.message);
    }
    return res.status(200).json(tasks.map(task => toResponse(task)));
  });
};

const createTask = async ({ boardId, taskData, res }) => {
  const newTask = new Task({ ...taskData, boardId });
  newTask.save((err, product) => {
    if (err) {
      return res.status(520).json(err.message);
    }
    return res.status(200).json(toResponse(product));
  });
};

const getTaskById = async ({ boardId, taskId, res }) => {
  Task.find({ boardId, _id: taskId }, (err, task) => {
    if (err) {
      return res.status(500).json(err.message);
    }
    return task.length > 0
      ? res.status(200).json(toResponse(task[0]))
      : res.status(404).json('Not found');
  });
};

const updateTask = async ({ boardId, taskId, taskData, res }) => {
  Task.updateOne({ boardId, _id: taskId }, taskData, (err, raw) => {
    if (err) {
      return res.status(520).json(err.message);
    }
    const { nModified } = raw;
    return nModified > 0
      ? res.status(200).json('Task has been updated')
      : res.status(404).json('Not found');
  });
};

const deleteTask = async ({ boardId, taskId, res }) => {
  Task.deleteMany({ _id: taskId, boardId }, (err, query) => {
    if (err) {
      return res.status(500).json(err.message);
    }
    const { deletedCount } = query;
    return deletedCount > 0
      ? res.status(204).json('Task has been deleted')
      : res.status(404).json('Task not found');
  });
};

const unassignAllUserTasks = async ({ userId }) => {
  Task.updateMany({ userId }, { userId: null }, (err, query) => {
    if (err) {
      throw err;
    }
    const { deletedCount } = query;
    return deletedCount;
  });
};

const deleteAllBoardTasks = async ({ boardId }) => {
  Task.deleteMany({ boardId }, (err, query) => {
    if (err) {
      throw err;
    }
    const { deletedCount } = query;
    return deletedCount;
  });
};

module.exports = {
  getAll,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  unassignAllUserTasks,
  deleteAllBoardTasks
};
