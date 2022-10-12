const router = require('express').Router();
const UserAuthentication = require('../middlewares/authentication');
const CartAuthorization = require('../middlewares/authorizationCart');
const CartController = require('../controllers/CartController');

router.get('/', UserAuthentication, CartController.getCart);
router.post('/', UserAuthentication, CartController.addCart);
router.patch('/:id/inc', UserAuthentication, CartAuthorization, CartController.incCart);
router.patch('/:id/dec', UserAuthentication, CartAuthorization, CartController.decCart);
router.delete('/:id', UserAuthentication, CartAuthorization, CartController.deleteCart);

module.exports = router;