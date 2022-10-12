const router = require('express').Router();
const SubCategoryController = require('../controllers/SubCategoryController');

router.get('/', SubCategoryController.fetchSubCategories);
router.get('/:id', SubCategoryController.fetchSubCategory);
// router.post('/', SubCategoryController.createSubCategories);

module.exports = router;