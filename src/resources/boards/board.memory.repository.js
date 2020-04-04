const Board = require('./board.model');
const errors = require('../errors');
const taskRepo = require('./tasks/task.memory.repository');

const boards = [];

const getAll = async () => boards;

const getById = async id => {
  const board = boards.find(el => el.id === id);
  if (board) {
    return { code: 200, body: board };
  }
  const error = errors.BOARD_NOT_FOUND;
  return { code: error.statusCode, body: error.message };
};

const createBoard = async ({ boardData }) => {
  const board = new Board(boardData);
  boards.push(board);
  return board;
};

const changeBoard = async ({ newBoardData, id }) => {
  const index = boards.findIndex(el => el.id === id);
  boards[index] = { ...newBoardData };
  return boards[index];
};

const deleteBoard = async ({ boardId }) => {
  const index = boards.findIndex(board => board.id === boardId);
  console.log(index);
  if (index < 0) {
    return;
  }
  boards.splice(index, 1);
  taskRepo.deleteAllBoardTasks({ boardId });
  return boards;
};

module.exports = {
  getAll,
  createBoard,
  getById,
  changeBoard,
  boards,
  deleteBoard
};
