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

const updateUser = ({ userData, id }) => {
  const { name, login, password } = userData;
  const user = new User({ id, name, login, password });
  const idx = id - 1;
  if (users[idx]) {
    users[idx] = user;
    return true;
  }
  return false;
};

const deleteUser = id => {
  const idx = id - 1;
  if (!users[idx]) {
    return false;
  }
  users.splice(idx, 1);
  users.forEach((el, index) => {
    el.id = index + 1;
  });
  return true;
};

module.exports = { getAll, getUser, createUser, updateUser, deleteUser };
