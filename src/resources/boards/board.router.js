const router = require('express').Router();
const boardService = require('./board.service');
const taskService = require('./tasks/task.service');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();
  return res.status(200).json(boards);
});

router.route('/:id').get(async (req, res) => {
  const id = req.params.id;
  const responseData = await boardService.getById(id);
  return res.status(responseData.code).json(responseData.body);
});

router.route('/').post(async (req, res) => {
  const resData = await boardService.createBoard(req.body);
  return res.status(resData.code).json(resData.body);
});

router.route('/:id').put(async (req, res) => {
  const id = req.params.id;
  const responseData = await boardService.changeBoard({
    newBoardData: req.body,
    id
  });
  return res.status(responseData.code).json(responseData.body);
});

router.route('/:boardId/tasks/').get(async (req, res) => {
  const boardId = req.params.boardId;
  const responseData = await taskService.getAll(boardId);
  return res.status(responseData.code).json(responseData.body);
});

router.route('/:boardId/tasks/').post(async (req, res) => {
  const boardId = req.params.boardId;
  const taskData = req.body;
  const responseData = await taskService.createTask({ boardId, taskData });
  return res.status(responseData.code).json(responseData.body);
});

module.exports = router;
