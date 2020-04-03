const User = require('./user.model');

const users = [
  new User({ name: 'first', login: 'safadfa', password: 'fadfafdaf' })
];

const getAll = async () => users;

const getUser = async id => users.find(el => el.id === id);

const createUser = userData => {
  const { name, login, password } = userData;
  const user = new User({
    name,
    login,
    password
  });
  users.push(user);
  return user;
};

const updateUser = async ({ userData, id }) => {
  const { name, login, password } = userData;
  const index = users.findIndex(el => {
    return el.id === id;
  });
  if (index === -1) {
    return false;
  }
  const user = new User({ id, name, login, password });
  users[index] = user;
  console.log(users);
  return user;
};

const deleteUser = async id => {
  const index = users.findIndex(el => {
    return el.id === id;
  });

  if (index === -1) {
    return false;
  }

  users.splice(index, 1);
  return true;
};

module.exports = { getAll, getUser, createUser, updateUser, deleteUser };
