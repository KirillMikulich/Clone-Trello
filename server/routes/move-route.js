const Router = require('express').Router;
const router = Router();
const moveController = require('../controllers/move-controller');

router.get('/columns/:dragId/:dropId', moveController.moveColumns);
router.get('/sprints/:dragId/:dropId', moveController.moveSprint);
router.get('/sprint-to-column/:sprintId/:columnId/:position', moveController.moveSprintToOtherColumn);

module.exports = router;
