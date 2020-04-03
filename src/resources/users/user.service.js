const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getUser = id => usersRepo.getUser(id);

const createUser = userData => usersRepo.createUser(userData);

const updateUser = ({ userData, id }) => usersRepo.updateUser({ userData, id });

const deleteUser = async id => usersRepo.deleteUser(id);

module.exports = { getAll, getUser, createUser, updateUser, deleteUser };
