const router = require('express').Router();
const userRoutes = require('./user');
const categoryRoutes = require('./category');
const subCategoryRoutes = require('./subcategory');
const productRoutes = require('./product');
const addressRoutes = require('./address');
const cartRoutes = require('./cart');

router.use(addressRoutes);
router.use(userRoutes);
router.use('/categories', categoryRoutes);
router.use('/sub-categories', subCategoryRoutes);
router.use('/products', productRoutes);
router.use('/cart', cartRoutes)

module.exports = router;