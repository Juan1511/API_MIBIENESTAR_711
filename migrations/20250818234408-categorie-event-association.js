'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('events', {
      fields:['categoryId'],
      type: 'foreign key',
      name: 'event_categorie_association',
      references: {
        table: 'categories',
        field: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('events', 'event_categorie_association');
  }
};
