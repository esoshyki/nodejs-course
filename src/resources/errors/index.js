const BAD_BOARD_DATA = {
  statusCode: 400,
  message: 'Incorrect board data'
};

const BOARD_NOT_FOUND = {
  statusCode: 404,
  message: 'The board has not been found'
};

module.exports = {
  BAD_BOARD_DATA,
  BOARD_NOT_FOUND
};
