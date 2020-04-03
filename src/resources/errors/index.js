const BAD_BOARD_DATA = {
  statusCode: 400,
  message: 'Incorrect board data'
};

const BOARD_NOT_FOUND = {
  statusCode: 404,
  message: 'The board has not been found'
};

const BAD_TASK_DATA = {
  statusCode: 400,
  message: 'Incorrect task data'
};

module.exports = {
  BAD_BOARD_DATA,
  BOARD_NOT_FOUND,
  BAD_TASK_DATA
};
