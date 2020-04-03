const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const UserValidator = require('./user.validator');
const errors = require('./user.errors');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.status(200).json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const id = req.params.id;

  try {
    UserValidator.getUserValidate(id);
    const user = await usersService.getUser(id);
    if (user) {
      return res.json(User.toResponse(user));
    }
    return res.status(404).json(errors.USER_NOT_FOUNDED.message);
  } catch (err) {
    return res.status(404).json(err.message);
  }
});

router.route('/').post(async (req, res) => {
  const userData = req.body;
  try {
    UserValidator.userDataValidate(userData);
    const user = await usersService.createUser(userData);
    console.log(user);
    return res.status(200).json(User.toResponse(user));
  } catch (err) {
    return res.status(401).json(err.message);
  }
});

router.route('/:id').put(async (req, res) => {
  const userData = req.body;
  const id = req.params.id;
  try {
    UserValidator.getUserValidate(id);
  } catch (error) {
    return res.status(400).json(error.message);
  }
  try {
    UserValidator.userDataValidate(userData);
    const result = await usersService.updateUser({ userData, id });
    if (result) {
      return res.status(200).json('The user has been updated');
    }
    return res.status(400).json('The user has not been founded');
  } catch (error) {
    return res.status(404).json(error.message);
  }
});

router.route('/:id').delete(async (req, res) => {
  const id = req.params.id;
  try {
    UserValidator.getUserValidate(id);
    const result = usersService.deleteUser(id);
    if (result) {
      return res.status(200).json('The user has been deleted');
    }
    return res.status(404).json('User not found');
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

module.exports = router;
