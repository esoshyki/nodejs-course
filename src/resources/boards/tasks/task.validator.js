const errors = require('../../errors');
const boardsRepo = require('../board.memory.repository');

const checkTaskData = async ({ taskData }) => {
  if (typeof taskData !== 'object') {
    return {
      code: errors.BAD_TASK_DATA.statusCode,
      body: errors.BAD_TASK_DATA.message
    };
  }
  const { boardId } = taskData;
  if (boardId && typeof boardId !== 'string') {
    return {
      code: errors.BAD_TASK_DATA.statusCode,
      body: errors.BAD_TASK_DATA.message
    };
  }
  const boards = boardsRepo.boards;
  const index = boards.findIndex(el => el.id === boardId);
  if (index === -1) {
    return {
      code: errors.BOARD_NOT_FOUND.statusCode,
      body: errors.BOARD_NOT_FOUND.message
    };
  }
  return;
};

module.exports = { checkTaskData };
