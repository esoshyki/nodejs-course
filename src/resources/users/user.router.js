const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const UserValidator = require('./user.validator');
const errors = require('./user.errors');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
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
  console.log(userData);
  try {
    UserValidator.createUserValidate(userData);
    await usersService.createUser(userData);
    res.status(200).send(`The user ${userData.name} has been created`);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

module.exports = router;
