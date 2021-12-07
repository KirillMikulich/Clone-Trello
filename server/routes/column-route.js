const Router = require('express').Router;
const router = Router();
const columnsController = require('../controllers/columns-controller');

router.post('/add', columnsController.addColumn);
router.get('/all-columns/:boardId', columnsController.getColumns);
router.get('/delete/:columnId', columnsController.deleteColumn);
router.get('/change-name/:columnId/:title', columnsController.changeName);

module.exports = router;
