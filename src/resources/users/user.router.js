const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const UserValidator = require('./user.validator');
const errors = require('./user.errors');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const id = req.params.id;

  try {
    UserValidator.getUserValidate(id);
  } catch (err) {
    res.status(401).send(err.message);
  }

  const user = await usersService.getUser(id);
  if (user) {
    res.json(User.toResponse(user));
  } else {
    res.status(404).send(errors.USER_NOT_FOUNDED.message);
  }
});

router.route('/').post(async (req, res) => {
  const userData = req.body;
  try {
    UserValidator.userDataValidate(userData);
    await usersService.createUser(userData);
    res.status(200).send(`The user ${userData.name} has been created`);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.route('/:id').put(async (req, res) => {
  const userData = req.body;
  const id = req.params.id;
  try {
    UserValidator.getUserValidate(id);
  } catch (error) {
    res.status(400).send(error.message);
  }
  try {
    UserValidator.userDataValidate(userData);
    const result = await usersService.updateUser({ userData, id });
    if (result) {
      res.status(200).send('The user has been updated');
    } else {
      res.status(400).send('The user has not been founded');
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.route('/:id').delete(async (req, res) => {
  const id = req.params.id;
  try {
    UserValidator.getUserValidate(id);
    const result = usersService.deleteUser(id);
    if (result) {
      res.status(200).send('The user has been deleted');
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
