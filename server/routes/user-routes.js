const Router = require('express').Router;
const router = Router();
const userController = require('../controllers/user-controller');
const { body } = require('express-validator');
const middleware = require('../middleware/middleware');//рабоатет через жопу

router.post('/registration', body('email').isEmail(), body('password').isLength({min:3,max:32}), userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);

module.exports = router;