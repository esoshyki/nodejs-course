const router = require('express').Router();
const boardService = require('./board.service');
const taskService = require('./tasks/task.service');

router.route('/').get(async (req, res) => {
  try {
    return await boardService.getAll({ res });
  } catch (error) {
    return res.status(520).json(error.message);
  }
});

router.route('/').post(async (req, res) => {
  const boardData = req.body;
  try {
    return await boardService.createBoard({ boardData, res });
  } catch (error) {
    return res.status(520).json(error.message);
  }
});

router.route('/:id').get(async (req, res) => {
  const id = req.params.id;
  try {
    return await boardService.getBoardById({ id, res });
  } catch (err) {
    return res.status(520).json(err.message);
  }
});

router.route('/:id').put(async (req, res) => {
  const id = req.params.id;
  const boardData = req.body;
  try {
    return await boardService.updateBoard({ boardData, id, res });
  } catch (err) {
    return res.status(520).json(err.message);
  }
});

router.route('/:boardId').delete(async (req, res) => {
  const { boardId } = req.params;
  try {
    return await boardService.deleteBoard({ id: boardId, res });
  } catch (error) {
    return res.status(520).json(error.message);
  }
});

router.route('/:boardId/tasks/').get(async (req, res) => {
  const boardId = req.params.boardId;
  const responseData = await taskService.getAll(boardId);
  return res.status(responseData.code).json(responseData.body);
});

router.route('/:boardId/tasks/:id').get(async (req, res) => {
  const boardId = req.params.boardId;
  const taskId = req.params.id;
  const responseData = await taskService.getTaskById({ boardId, taskId });
  return res.status(responseData.code).json(responseData.body);
});

router.route('/:boardId/tasks/').post(async (req, res) => {
  const boardId = req.params.boardId;
  const taskData = req.body;
  try {
    const responseData = await taskService.createTask({ boardId, taskData });
    return res.status(responseData.code).json(responseData.body);
  } catch (err) {
    return res.status(520).json(err.message);
  }
});

router.route('/:boardId/tasks/:taskId').put(async (req, res) => {
  const boardId = req.params.boardId;
  const taskId = req.params.taskId;
  const taskData = req.body;
  try {
    const responseData = await taskService.updateTask({
      boardId,
      taskId,
      taskData
    });
    return res.status(responseData.code).json(responseData.body);
  } catch (err) {
    return res.status(520).json(err.message);
  }
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
  const { boardId, taskId } = req.params;
  try {
    const responseData = await taskService.deleteTask({ boardId, taskId });
    return res.status(responseData.code).json(responseData.body);
  } catch (err) {
    return res.status(520).json(err.message);
  }
});

module.exports = router;
