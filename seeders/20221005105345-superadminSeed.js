'use strict';

const { hashPw } = require('../helpers');

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
    const superAdmin = require('../data/superadmin.json');
    superAdmin.forEach(v => {
      v.password = hashPw(v.password);
      v.createdAt = v.updatedAt = new Date();
    });
    await queryInterface.bulkInsert('Users', superAdmin, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
