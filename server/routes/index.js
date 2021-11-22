const Router = require('express').Router;
const router = Router();

const UserRoutes = require('./user-routes');

router.use('/user', UserRoutes);

module.exports = router;