const User = require('./user.model');

const users = [];

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  return users;
};

const getUser = async id => users[id];

const createUser = userData => {
  const { name, login, password } = userData;
  const user = new User({
    id: users.length + 1,
    name,
    login,
    password
  });
  users.push(user);
  return;
};

module.exports = { getAll, getUser, createUser };
