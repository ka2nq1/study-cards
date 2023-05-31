const Router = require('express');
const userController = require('../controllers/user-controller');
const {body} = require('express-validator');

const router = new Router();

router.post('/registration',
    body('username', 'username cannot be empty').notEmpty(),
    body('password', 'password must be more than 2 and less than 33 characters').isLength({min: 3, max: 32}),
    userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);

module.exports = router;