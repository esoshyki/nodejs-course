const mongoose = require('mongoose');
const taskMongoose = require('../boards/tasks/task.mongoose');
const bcrypt = require('bcrypt');

const errors = {
  CastError: {
    message: 'User not found',
    statusCode: 404
  }
};

const saltRounds = 10;

const userSchema = new mongoose.Schema(
  {
    name: 'string',
    login: 'string',
    password: 'string'
  },
  { versionKey: false }
);

userSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.validatePassword = async function validate(data, callback) {
  console.log(data);
  console.log(this.password);
  bcrypt.compare(data, this.password, (err, res) => {
    if (err) {
      throw err;
    } else {
      return callback(res);
    }
  });
};

const User = mongoose.model('User', userSchema);

const toResponse = user => {
  const { _id, name, login } = user;
  return { id: _id, name, login };
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
  newUser.save((err, product) => {
    if (err) {
      return res.status(500).json(err.message);
    }
    console.log(product ? toResponse(product) : product);
    return res.status(200).json(toResponse(product));
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
  User.replaceOne({ _id: id }, userData, (err, raw) => {
    if (err) {
      const error = errors[err.name];
      return error
        ? res.status(error.statusCode).json(error.message)
        : res.status(500).json(err.message);
    }
    const { nModified } = raw;
    return nModified > 0
      ? res.status(200).json('User has been updated')
      : res.status(400).json('Bad request');
  });
};

const deleteUser = async ({ id, res }) => {
  await taskMongoose.unassignAllUserTasks({ userId: id });
  User.deleteMany({ _id: id }, (err, query) => {
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

module.exports = {
  getAll,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  User
};
