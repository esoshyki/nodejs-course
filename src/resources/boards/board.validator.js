const errors = require('../errors');

class BoardValidator {
  static validateBoardData(boardData) {
    if (typeof boardData !== 'object') {
      return errors.BAD_BOARD_DATA;
    }
    const { title, colums } = boardData;
    if (!title) {
      return errors.BAD_BOARD_DATA;
    }
    if (colums && !Array.isArray(colums)) {
      return errors.BAD_BOARD_DATA;
    }
    return;
  }
}

module.exports = BoardValidator;
