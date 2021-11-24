const Router = require('express').Router;
const router = Router();
const boardController = require('../controllers/board-controller');

router.post('/add', boardController.addBoardByUser);
router.get('/get-boards/:userId', boardController.getBoardsByUserId);
router.get('/delete-board/:boardId', boardController.deleteBoardById);
router.get('/add-user/:userId/:boardId', boardController.addUserById);

module.exports = router;