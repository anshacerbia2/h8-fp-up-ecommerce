const router = require('express').Router();
const ProductController = require('../controllers/ProductController');
const UserController = require('../controllers/UserController');
const UserAuthentication = require('../middlewares/authentication');
const ProductAuthorization = require('../middlewares/authorizationProduct');

router.get('/', ProductController.fetchProducts);
router.get('/latest', ProductController.fetchLatestProducts);
router.get('/user', UserAuthentication, ProductController.fetchUserProducts);
router.post('/search', ProductController.fetchProductByTitle);
router.get('/:id', ProductController.fetchProduct);
router.post('/', UserAuthentication, ProductController.createProduct);
router.put('/:id', UserAuthentication, ProductAuthorization, ProductController.updateProduct);
router.delete('/:id', UserAuthentication, ProductAuthorization, ProductController.deleteProduct);

module.exports = router;