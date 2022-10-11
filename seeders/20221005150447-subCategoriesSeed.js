'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const subCategories = require('../data/subcategories.json');
    subCategories.forEach(v => {
      delete v.id;
      v.createdAt = v.updatedAt = new Date()
    });
    await queryInterface.bulkInsert('SubCategories', subCategories, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('SubCategories', null, {});
  }
};
