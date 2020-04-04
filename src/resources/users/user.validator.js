const errors = require('../errors');

const validateUserId = async userId => {
  if (typeof userId !== 'string') {
    return {
      code: errors.INCORRECT_USER_DATA.statusCode,
      body: errors.INCORRECT_USER_DATA.message
    };
  }
};

const validateUserData = async ({ name, login, password }) => {
  if (!name || !login || !password) {
    return {
      code: errors.INCORRECT_USER_DATA.statusCode,
      body: errors.INCORRECT_USER_DATA.message
    };
  }
};

module.exports = { validateUserId, validateUserData };
