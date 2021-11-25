const Router = require('express').Router;
const router = Router();
const sprintController = require('../controllers/sprint-controller');

router.post('/add-sprint', sprintController.addSprint);
router.get('/delete-sprint/:id', sprintController.deleteSprint);
router.get('/add-user/:id/:userId', sprintController.addUserBySprint);
router.get('/delete-user/:id/:userId', sprintController.deleteUserInSprint);
router.get('/all-participant/:sprintId', sprintController.allParticipantBySprint);
router.post('/add-comment', sprintController.addComment);
router.get('/delete-comment/:id', sprintController.deleteComment);
router.get('/all-comment/:sprintId', sprintController.allCommentBySprint);
router.get('/all-sprint/:columnId', sprintController.allSprints);

module.exports = router;
