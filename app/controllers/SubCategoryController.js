const { SubCategory, Category, sequelize } = require('../models');
const { Op } = require('sequelize')

class SubCategoryController {
  static async fetchSubCategories(request, response, next) {
    try {
      const subCategories = await SubCategory.findAll({
        include: {
          model: Category,
          attributes: ['id', 'name']
        }
      });
      response.status(200).json(subCategories);
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  static async fetchSubCategory(request, response, next) {
    try {
      const { id } = request.params;
      const subCategory = await SubCategory.findByPk(id, {
        include: {
          model: Category,
          attributes: ['id', 'name']
        }
      });
      response.status(200).json(subCategory);
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  // static async createSubCategories(request, response, next) {
  //   try {
  //     const { name, CategoryId } = request.body;
  //     await SubCategory.create({ name, CategoryId });
  //     response.status(201).json({ message: 'Sub Category has been added successfully' });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // static async updateSubCategory(request, response, next) {
  //   try {
  //     const { id } = request.params;
  //     const { name, CategoryId } = request.body;
  //     const subCat = await SubCategory.findByPk(id);
  //     if (!subCat) throw { status: 404, message: 'Sub Category not found.' }
  //     await SubCategory.update({ name, CategoryId }, { where: { id: { [Op.eq]: id } } });
  //     response.status(200).json({ message: 'Sub Category has been updated successfully.' });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // static async deleteSubCategory(request, response, next) {
  //   try {
  //     const { id } = request.params;
  //     const subCat = await SubCategory.findByPk(id);
  //     if (!subCat) throw { status: 404, message: 'Sub Category not found.' };
  //     await SubCategory.destroy({ where: { id: { [Op.eq]: id } } });
  //     response.status(200).json({ message: 'Sub Category has been deleted successfully' });
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}

module.exports = SubCategoryController;