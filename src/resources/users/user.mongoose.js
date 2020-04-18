const mongoose = require('mongoose');

const errors = {
  CastError: {
    message: 'User not found',
    statusCode: 404
  }
};

const userSchema = new mongoose.Schema({
  name: 'string',
  login: 'string',
  password: 'string'
});

const User = mongoose.model('User', userSchema);

const toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

const getAll = async res => {
  User.find((err, users) => {
    if (err) {
      return res.status(500).json('Database Error');
    }
    return res.status(200).json(users.map(user => toResponse(user)));
  });
};

const createUser = async ({ userData, res }) => {
  const newUser = new User(userData);
  newUser.save(err => {
    if (err) {
      return res.status(500).json(err.message);
    }
    return res.status(200).json('User has been created');
  });
};

const getUserById = async ({ id, res }) => {
  User.findById(id, (err, user) => {
    if (err) {
      const error = errors[err.name];
      return error
        ? res.status(error.statusCode).json(error.message)
        : res.status(500).json(err.message);
    }
    return res.status(200).json(toResponse(user));
  });
};

const updateUser = async ({ userData, id, res }) => {
  User.replaceOne({ _id: id }, userData, err => {
    if (err) {
      const error = errors[err.name];
      return error
        ? res.status(error.statusCode).json(error.message)
        : res.status(500).json(err.message);
    }
    return res.status(200).json('User has been updated');
  });
};

const deleteUser = async ({ id, res }) => {
  User.deleteOne({ _id: id }, (err, query) => {
    if (err) {
      const error = errors[err.name];
      return error
        ? res.status(error.statusCode).json(error.message)
        : res.status(500).json(err.message);
    }
    const { deletedCount } = query;
    if (deletedCount > 0) {
      return res.status(200).json('User has been deleted');
    }
    return res.status(404).json('User not found');
  });
};

module.exports = { getAll, createUser, getUserById, updateUser, deleteUser };
