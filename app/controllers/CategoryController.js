const { Category } = require('../models');

class CategoryController {
  static async fetchCategories(request, response, next) {
    try {
      const categories = await Category.findAll();
      response.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CategoryController;