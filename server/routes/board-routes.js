const Router = require('express').Router;
const router = Router();
const boardController = require('../controllers/board-controller');

router.post('/add', boardController.addBoardByUser);
router.get('/get-boards/:userId', boardController.getBoardsByUserId);
router.get('/delete-board/:boardId', boardController.deleteBoardById);
router.get('/add-user/:email/:boardId', boardController.addUserById);
router.get('/delete-user/:userId/:boardId', boardController.deleteBoardForUser);
router.get('/get-board/:boardId', boardController.getBoardbyId);
router.post('/change-name/:boardId', boardController.changeName);

module.exports = router;
