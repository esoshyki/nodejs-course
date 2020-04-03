const errors = require('./user.errors');

class UserValidator {
  static getUserValidate(id) {
    if (typeof id !== 'string') {
      throw errors.BAD_REQUEST;
    } else {
      return;
    }
  }

  static userDataValidate({ name, login, password }) {
    if (!name || !login || !password) {
      throw errors.INCORRECT_USER_DATA;
    }
    return;
  }
}

module.exports = UserValidator;
