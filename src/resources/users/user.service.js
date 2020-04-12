const usersRepo = require('./user.memory.repository');
const userValidator = require('./user.validator');
const tasksRepo = require('../boards/tasks/task.memory.repository');

const getAll = async () => {
  const users = await usersRepo.getAll();
  return { code: 200, body: users };
};

const getUser = async ({ id }) => {
  const user = await usersRepo.getUser(id);
  if (user) {
    return { code: 200, body: user };
  }
  return { code: 404, body: 'USER_NOT_FOUND' };
};

const createUser = async userData => {
  const error = await userValidator.validateUserData(userData);
  if (error) {
    return { code: error.code, body: error.body };
  }
  const user = await usersRepo.createUser(userData);
  return { code: 200, body: user };
};

const updateUser = async ({ userData, id }) => {
  const error = await userValidator.validateUserData(userData);
  if (error) {
    return { code: error.code, body: error.body };
  }
  const user = usersRepo.updateUser({ userData, id });
  return { code: 200, body: user };
};

const deleteUser = async id => {
  await tasksRepo.deleteAllUserTasks({ userId: id });
  const error = await userValidator.validateUserId(id);
  if (error) {
    return { code: error.code, body: error.body };
  }
  const users = await usersRepo.deleteUser(id);
  return { code: 200, body: users };
};

module.exports = { getAll, getUser, createUser, updateUser, deleteUser };
