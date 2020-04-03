const User = require('./user.model');

const users = [];

const getAll = async () => {
  console.log(users);
  // TODO: mock implementation. should be replaced during task development
  return users;
};

const getUser = async id => users[id - 1];

const createUser = async userData => {
  const { name, login, password } = userData;
  const user = new User({
    id: (users.length + 1).toString(10),
    name,
    login,
    password
  });
  users.push(user);
  return user;
};

const updateUser = ({ userData, id }) => {
  const { name, login, password } = userData;
  const user = new User({ id: id.toString(10), name, login, password });
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
    el.id = (index + 1).toString(10);
  });
  return true;
};

module.exports = { getAll, getUser, createUser, updateUser, deleteUser };
