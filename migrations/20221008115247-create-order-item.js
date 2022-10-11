'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productId: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      itemImg: {
        type: Sequelize.STRING
      },
      SubCategoryId: {
        type: Sequelize.INTEGER
      },
      SubCategoryName: {
        type: Sequelize.STRING
      },
      CategoryId: {
        type: Sequelize.INTEGER
      },
      CategoryName: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      author: {
        type: Sequelize.STRING
      },
      authorImg: {
        type: Sequelize.STRING
      },
      authorId: {
        type: Sequelize.INTEGER,
      },
      OrderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Orders',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OrderItems');
  }
};