const User = require('./user.model');
const taskRepo = require('../boards/tasks/task.memory.repository');

const users = [
  new User({ name: 'first', login: 'safadfa', password: 'fadfafdaf' })
];

const getAll = async () => users.map(user => User.toResponse(user));

const getUser = async id => users.find(el => el.id === id);

const createUser = async userData => {
  const user = new User(userData);
  users.push(user);
  return User.toResponse(user);
};

const updateUser = async ({ userData, id }) => {
  const { name, login, password } = userData;
  const index = users.findIndex(user => user.id === id);
  if (index === -1) {
    return false;
  }
  const user = new User({ id, name, login, password });
  users[index] = user;
  return User.toResponse(user);
};

const deleteUser = async id => {
  taskRepo.deleteAllUserTasks({ userId: id });
  const index = users.findIndex(el => el.id === id);
  if (index === -1) {
    return false;
  }
  users.splice(index, 1);
  return users;
};

module.exports = { getAll, getUser, createUser, updateUser, deleteUser };
