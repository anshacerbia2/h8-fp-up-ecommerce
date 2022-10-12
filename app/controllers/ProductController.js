const {
  Address,
  User,
  Product,
  SubCategory,
  Category,
  Image,
  sequelize,
} = require("../models");
const { Op } = require("sequelize");

class ProductController {
  static async fetchProducts(request, response, next) {
    try {
      const { cat } = request.query;
      const options = {
        include: [
          {
            model: SubCategory,
            attributes: ["id", "name"],
            include: {
              model: Category,
              attributes: ["id", "name"],
            },
          },
          {
            model: User,
            attributes: { exclude: ["password", "createdAt", "updatedAt"] },
          },
        ],
      };
      if (cat) {
        options.where = {
          SubCategoryId: {
            [Op.eq]: cat,
          },
        };
      }
      const products = await Product.findAll(options);
      response.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  static async fetchProduct(request, response, next) {
    try {
      const { id } = request.params;
      const product = await Product.findByPk(id, {
        include: [
          {
            model: SubCategory,
            attributes: ["id", "name"],
            include: {
              model: Category,
              attributes: ["id", "name"],
            },
          },
          {
            model: User,
            attributes: { exclude: ["password", "createdAt", "updatedAt"] },
            include: {
              model: Address,
              attributes: ['city', 'cityId', 'default'],
              // where: {
              //   default: true
              // }
            },
          },
        ],
      });
      if (!product) throw { status: 404, message: "Product not found" };
      response.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  static async fetchProductByTitle(request, response, next) {
    const { search } = request.body;
    console.log(search);
    try {
      const data = await Product.findAll({
        where: {
          name: {
            [Op.iLike]: `%${search}%`,
          },
        },
      });
      response.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async fetchLatestProducts(request, response, next) {
    try {
      const options = {
        include: [
          {
            model: SubCategory,
            attributes: ["id", "name"],
            include: {
              model: Category,
              attributes: ["id", "name"],
            },
          },
          {
            model: User,
            attributes: { exclude: ["password", "createdAt", "updatedAt"] },
          },
        ],
        order: [["id", "DESC"]],
        limit: 5,
      };
      const products = await Product.findAll(options);
      response.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  static async fetchUserProducts(request, response, next) {
    try {
      const { id: userId } = request.user;
      const options = {
        include: [
          {
            model: SubCategory,
            attributes: ["id", "name"],
            include: {
              model: Category,
              attributes: ["id", "name"],
            },
          },
          {
            model: User,
            attributes: { exclude: ["password", "createdAt", "updatedAt"] },
          },
        ],
        where: { authorId: { [Op.eq]: userId } },
      };
      const products = await Product.findAll(options);
      response.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  static async createProduct(request, response, next) {
    try {
      const { id: authorId } = request.user;
      const {
        name,
        slug,
        description,
        price,
        mainImg,
        harvestDate,
        unit,
        stock,
        SubCategoryId,
        image1,
        image2,
        image3,
      } = request.body;

      const newProduct = await Product.create(
        {
          name,
          slug,
          description,
          price,
          mainImg,
          harvestDate,
          unit,
          stock,
          SubCategoryId,
          authorId,
        },
      );
      response.status(201).json({ message: "Product has been added successfully" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateProduct(request, response, next) {
    const t = await sequelize.transaction();
    try {
      const { id: productId } = request.params;
      const {
        name,
        slug,
        description,
        price,
        mainImg,
        harvestDate,
        stock,
        unit,
        SubCategoryId,
        image1,
        image2,
        image3,
      } = request.body;
      await Product.update(
        {
          name,
          slug,
          description,
          price,
          mainImg,
          harvestDate,
          stock,
          unit,
          SubCategoryId,
        },
        { where: { id: { [Op.eq]: productId } }, transaction: t }
      );
      await t.commit();
      response
        .status(200)
        .json({ message: "Product has been updated successfully" });
    } catch (error) {
      console.log(error);
      await t.rollback();
      next(error);
    }
  }

  static async deleteProduct(request, response, next) {
    try {
      const { id: productId } = request.params;
      await Product.destroy({ where: { id: { [Op.eq]: productId } } });
      response.status(200).json({ message: "Product has been deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
