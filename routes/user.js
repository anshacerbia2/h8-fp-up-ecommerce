const router = require('express').Router();
const MidtransController = require('../controllers/MidtransController');
const UserController = require('../controllers/UserController');
const UserAuthentication = require('../middlewares/authentication');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/users', UserController.users);
router.get('/users/:id', UserController.user);
router.post('/users/address', UserAuthentication, UserController.addAddress);
router.post('/charge', UserAuthentication, MidtransController.charge);
router.get('/orders', UserAuthentication, UserController.orderList);

module.exports = router;