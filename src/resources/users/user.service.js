const userValidator = require('./user.validator');
const userMongoose = require('./user.mongoose');

const getAll = async res => await userMongoose.getAll(res);

const createUser = async ({ userData, res }) => {
  const error = await userValidator.validateUserData(userData);
  if (error) {
    return res.status(error.code).json(error.body);
  }
  return await userMongoose.createUser({ userData, res });
};

const getUser = async ({ id, res }) => {
  return await userMongoose.getUserById({ id, res });
};

const updateUser = async ({ userData, id, res }) => {
  const error = await userValidator.validateUserData(userData);
  if (error) {
    return res.status(error.code).json(error.body);
  }
  return await userMongoose.updateUser({ userData, id, res });
};

const deleteUser = async ({ id, res }) => {
  const error = await userValidator.validateUserId(id);
  if (error) {
    return res.status(error.code).json(error.body);
  }
  return await userMongoose.deleteUser({ id, res });
};

module.exports = { getAll, getUser, createUser, updateUser, deleteUser };
