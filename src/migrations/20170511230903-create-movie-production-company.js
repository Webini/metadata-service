'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('MovieProductionCompany', {
      movie_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Movie',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      production_company_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ProductionCompany',
          key: 'id'
        },
        onDelete: 'cascade'
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('MovieProductionCompany');
  }
};