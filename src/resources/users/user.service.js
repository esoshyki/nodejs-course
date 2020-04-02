const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getUser = id => usersRepo.getUser(id);

const createUser = userData => usersRepo.createUser(userData);

module.exports = { getAll, getUser, createUser };
