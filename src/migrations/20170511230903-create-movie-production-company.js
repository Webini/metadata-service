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
    }, {
      charset: 'utf8',
      collate: 'utf8_unicode_ci'
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('MovieProductionCompany');
  }
};