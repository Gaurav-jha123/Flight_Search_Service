'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Cities', [
      { id: 4, name: 'Delhi', createdAt: new Date(), updatedAt: new Date() },
      { id: 13, name: 'Karnataka', createdAt: new Date(), updatedAt: new Date() },
      // Add other required cities
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cities', null, {});
  }
};
