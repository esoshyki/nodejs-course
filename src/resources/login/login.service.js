const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');
const { User } = require('../users/user.mongoose');

const signIn = async (userData, callback) => {
  const res = await User.find({ login: userData.login });
  if (!res) {
    throw new Error('not found');
  }
  User.findOne({ login: userData.login }, (error, user) => {
    if (error) {
      throw error;
    } else {
      user.validatePassword(userData.password, passwordIsValid => {
        if (passwordIsValid) {
          const token = jwt.sign(
            { id: user.id, login: user.login },
            JWT_SECRET_KEY,
            { expiresIn: '1h' }
          );
          return callback({ passwordIsValid, token });
        }

        return callback({ passwordIsValid: false, token: null });
      });
    }
  });
};

module.exports = { signIn };
