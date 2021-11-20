const Router = require('express').Router;
const router = Router();

const UserRoutes = require('./user-routes');

router.use('/', UserRoutes);

module.exports = router;