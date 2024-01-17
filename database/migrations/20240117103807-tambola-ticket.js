'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tambola_tickets', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      ticketNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'ticket_number',
      },
      ticketData: {
        type: Sequelize.JSON,
        allowNull: false,
        field: 'ticket_data',
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tambola_tickets');
  },
};
