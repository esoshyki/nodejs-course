const boardRepo = require('./board.memory.repository');
const BoardValidator = require('./board.validator');

const getAll = () => boardRepo.getAll();

const getById = id => boardRepo.getById(id);

const createBoard = async boardData => {
  const error = BoardValidator.validateBoardData(boardData);
  if (error) {
    return { code: error.statusCode, body: error.message };
  }
  const board = await boardRepo.createBoard({ boardData });
  return { code: 200, body: board };
};

const changeBoard = ({ newBoardData, id }) => {
  const error = BoardValidator.validateBoardData(newBoardData);
  if (error) {
    return { code: error.statusCode, body: error.message };
  }
  const board = boardRepo.changeBoard({ newBoardData, id });
  return { code: 200, body: board };
};

const deleteBoard = async ({ boardId }) => {
  const boards = await boardRepo.deleteBoard({ boardId });
  return { code: 200, body: boards };
};

module.exports = { getAll, createBoard, getById, changeBoard, deleteBoard };
