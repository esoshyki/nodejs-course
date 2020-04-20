const mongoose = require('mongoose');
const taskMongoose = require('./tasks/task.mongoose');

const boardSchema = new mongoose.Schema({
  title: String,
  columns: Array
});

const errors = {
  CastError: {
    message: 'User not found',
    statusCode: 404
  }
};

const toResponse = board => {
  const { _id, title, columns } = board;
  return { title, id: _id, columns };
};

const Board = mongoose.model('Board', boardSchema);

const getAll = async ({ res }) => {
  Board.find((err, boards) => {
    if (err) {
      return res.status(500).json(err.message);
    }
    return res.status(200).json(boards.map(board => toResponse(board)));
  });
};

const createBoard = async ({ boardData, res }) => {
  const newBoard = new Board(boardData);
  newBoard.save((err, board) => {
    if (err) {
      return res.status(500).json(err.message);
    }
    const { _doc } = board;
    return res.status(200).json(toResponse(_doc));
  });
};

const getBoardById = async ({ id, res }) => {
  Board.findById(id, (err, board) => {
    if (err) {
      return res.status(500).json(err.message);
    }
    return board
      ? res.status(200).json(toResponse(board))
      : res.status(404).json('Board not found');
  });
};

const updateBoard = async ({ boardData, id, res }) => {
  Board.replaceOne({ _id: id }, boardData, (err, raw) => {
    if (err) {
      const error = errors[err.name];
      return error
        ? res.status(error.statusCode).json(error.message)
        : res.status(500).json(err.message);
    }
    const { nModified } = raw;
    return nModified > 0
      ? res.status(200).json(toResponse(boardData))
      : res.status(400).json('Bad request');
  });
};

const deleteBoard = async ({ id, res }) => {
  await taskMongoose.deleteAllBoardTasks({ boardId: id });
  Board.deleteMany({ _id: id }, (err, query) => {
    if (err) {
      const error = errors[err.name];
      return error
        ? res.status(error.statusCode).json(error.message)
        : res.status(500).json(err.message);
    }
    const { deletedCount } = query;
    return deletedCount > 0
      ? res.status(200).json('Board has been deleted')
      : res.status(404).json('Board not found');
  });
};

module.exports = {
  getAll,
  createBoard,
  getBoardById,
  updateBoard,
  deleteBoard
};
