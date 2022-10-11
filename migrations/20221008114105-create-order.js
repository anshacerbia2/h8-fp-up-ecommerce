'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      order_id: {
        allowNull: false,
        type: Sequelize.STRING
      },
      transaction_status: {
        allowNull: false,
        type: Sequelize.STRING
      },
      transaction_time: {
        allowNull: false,
        type: Sequelize.DATE
      },
      response: {
        type: Sequelize.TEXT
      },
      carts: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      shipping_address: {
        allowNull: false,
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('Orders');
  }
};