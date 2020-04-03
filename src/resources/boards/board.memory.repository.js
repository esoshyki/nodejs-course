const Board = require('./board.model');
const errors = require('../errors');

const boards = [];

const getAll = async () => boards;

const getById = async id => {
  console.log(id);
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

module.exports = { getAll, createBoard, getById, changeBoard, boards };
