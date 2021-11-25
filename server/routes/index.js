const Router = require('express').Router;
const router = Router();

const UserRoutes = require('./user-routes');
const BoardRoutes = require('./board-routes');
const ColumnsRoutes = require('./column-route');
const SprintRoutes = require('./sprint-routes');

router.use('/user', UserRoutes);
router.use('/board', BoardRoutes);
router.use('/column', ColumnsRoutes);
router.use('/sprint', SprintRoutes);

module.exports = router;
