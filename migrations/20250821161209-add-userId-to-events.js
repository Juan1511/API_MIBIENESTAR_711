'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Agregar la columna userId a la tabla events
    await queryInterface.addColumn('events', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // Nombre de la tabla users
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    });

    // Crear índice para mejorar el rendimiento
    await queryInterface.addIndex('events', ['userId']);
  },

  async down(queryInterface, Sequelize) {
    // Eliminar la columna userId en caso de rollback
    await queryInterface.removeColumn('events', 'userId');
  }
};