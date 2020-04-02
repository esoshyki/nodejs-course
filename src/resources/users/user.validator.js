const errors = require('./user.errors');

class UserValidator {
  static getUserValidate(id) {
    if (!parseInt(id, 10)) {
      throw errors.BAD_REQUEST;
    } else {
      return;
    }
  }

  static createUserValidate({ name, login, password }) {
    if (!name || !login || !password) {
      throw errors.INCORRECT_USER_DATA;
    }
    return;
  }
}

module.exports = UserValidator;
