const BoardValidator = require('./board.validator');
const boardsMongoose = require('./board.mangoose');

const getAll = async ({ res }) => {
  return await boardsMongoose.getAll({ res });
};

const createBoard = async ({ boardData, res }) => {
  const error = BoardValidator.validateBoardData(boardData);
  if (error) {
    return { code: error.statusCode, body: error.message };
  }
  return await boardsMongoose.createBoard({ boardData, res });
};

const getBoardById = async ({ id, res }) => {
  return await boardsMongoose.getBoardById({ id, res });
};

const updateBoard = async ({ boardData, id, res }) => {
  const error = BoardValidator.validateBoardData(boardData);
  if (error) {
    return { code: error.statusCode, body: error.message };
  }
  return await boardsMongoose.updateBoard({ boardData, id, res });
};

const deleteBoard = async ({ id, res }) => {
  return await boardsMongoose.deleteBoard({ id, res });
};

module.exports = {
  getAll,
  createBoard,
  getBoardById,
  updateBoard,
  deleteBoard
};
