const Router = require('express');
const controller = require('../controllers/authController');
const {check} = require('express-validator');

const router = new Router();

router.post('/registration', [
    check('username', "Username cannot be empty").notEmpty(),
    check('password', "Password must be longer than 3 characters").isLength({min: 4})
], controller.registration);
router.post('/login', controller.login);
router.get('/users', controller.getUsers);

module.exports = router;