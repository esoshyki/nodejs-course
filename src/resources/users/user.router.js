const router = require('express').Router();
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  try {
    const responesData = await usersService.getAll();
    return res.status(responesData.code).json(responesData.body);
  } catch (error) {
    return res.status(520).json(error.message);
  }
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  try {
    const responesData = await usersService.getUser({ id });
    return res.status(responesData.code).json(responesData.body);
  } catch (error) {
    return res.status(520).json(error.message);
  }
});

router.route('/').post(async (req, res) => {
  const userData = req.body;
  const responesData = await usersService.createUser(userData);
  return res.status(responesData.code).json(responesData.body);
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const userData = req.body;
  try {
    const responesData = await usersService.updateUser({ userData, id });
    return res.status(responesData.code).json(responesData.body);
  } catch (error) {
    return res.status(520).json(error.message);
  }
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  try {
    const responesData = await usersService.deleteUser(id);
    return res.status(responesData.code).json(responesData.body);
  } catch (error) {
    return res.status(520).json(error.message);
  }
});

module.exports = router;
