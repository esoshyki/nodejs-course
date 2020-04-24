const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');
const { getUserByLogin, validatePass } = require('../users/user.mongoose');

const signIn = async (userData, callback) => {
  const user = await getUserByLogin(userData.login);
  if (!user) {
    return callback({ passwordIsValid: false, token: null });
  }
  const token = jwt.sign({ id: user._id, login: user.login }, JWT_SECRET_KEY, {
    expiresIn: 60 * 60
  });
  const passwordIsValid = await validatePass({
    serverPassword: user.password,
    clienPassword: userData.password
  });
  console.log(token);
  return callback({ passwordIsValid, token });
};

module.exports = { signIn };
