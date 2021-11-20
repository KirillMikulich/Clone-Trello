const Router = require('express').Router;
const router = Router();
const userController = require('../controllers/user-controller');
const { body } = require('express-validator');
const middleware = require('../middleware');

router.post('/registration', body('email').isEmail(), body('password').isLength({min:3,max:32}), userController.registration);
router.post('/login', userController.login);
router.post('/logout', middleware, userController.logout);
router.get('/refresh', middleware, userController.refresh);

module.exports = router;