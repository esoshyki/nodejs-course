const errors = require('../errors');

const validateUserId = async userId => {
  if (typeof userId !== 'string' || !userId) {
    return {
      code: errors.INCORRECT_USER_DATA.statusCode,
      body: errors.INCORRECT_USER_DATA.message
    };
  }
};

const validateUserData = async ({ name, login, password }) => {
  if (name.length === 0 || login.length === 0 || password.length === 0) {
    return {
      code: errors.INCORRECT_USER_DATA.statusCode,
      body: errors.INCORRECT_USER_DATA.message
    };
  }
};

module.exports = { validateUserId, validateUserData };
