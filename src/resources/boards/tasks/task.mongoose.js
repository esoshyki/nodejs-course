const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  order: Number,
  description: String,
  columnId: String,
  userId: String,
  boardId: String
});

taskSchema.method('transform', function transform() {
  const obj = this.toObject();
  obj.id = obj._id;
  delete obj._id;
  return obj;
});

const Task = mongoose.model('Task', taskSchema);

const getAll = async ({ boardId, res }) => {
  Task.find({ boardId }, (err, tasks) => {
    if (err) {
      return res.status(500).json(err.message);
    }
    return res.status(200).json(tasks);
  });
};

const createTask = async ({ boardId, taskData, res }) => {
  const newTask = new Task({ ...taskData, boardId });
  newTask.save(err => {
    if (err) {
      return res.status(520).json(err.message);
    }
    return res.status(200).json('The task has been created.');
  });
};

const getTaskById = async ({ boardId, taskId, res }) => {
  Task.find({ boardId, _id: taskId }, (err, task) => {
    if (err) {
      return res.status(500).json(err.message);
    }
    return res.status(200).json(task);
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
  Task.deleteOne({ _id: taskId, boardId }, (err, query) => {
    if (err) {
      return res.status(500).json(err.message);
    }
    const { deletedCount } = query;
    return deletedCount > 0
      ? res.status(200).json('Task has been deleted')
      : res.status(404).json('Task not found');
  });
};

const deleteAllUserTasks = async ({ userId }) => {
  Task.deleteMany({ userId }, (err, query) => {
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
  deleteAllUserTasks
};
