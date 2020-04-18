const router = require('express').Router();
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  try {
    return await usersService.getAll(res);
  } catch (error) {
    return res.status(520).json(error.message);
  }
});

router.route('/').post(async (req, res) => {
  const userData = req.body;
  try {
    return await usersService.createUser({ userData, res });
  } catch (error) {
    return res.status(520).json(error.message);
  }
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  try {
    return await usersService.getUser({ id, res });
  } catch (error) {
    return res.status(520).json(error.message);
  }
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const userData = req.body;
  try {
    return await usersService.updateUser({ userData, id, res });
  } catch (error) {
    return res.status(520).json(error.message);
  }
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  try {
    return await usersService.deleteUser({ id, res });
  } catch (error) {
    return res.status(520).json(error.message);
  }
});

module.exports = router;
