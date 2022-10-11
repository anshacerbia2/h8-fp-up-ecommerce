const router = require('express').Router();
const SubCategoryController = require('../controllers/SubCategoryController');

router.get('/', SubCategoryController.fetchSubCategories);
router.get('/:id', SubCategoryController.fetchSubCategory);

module.exports = router;