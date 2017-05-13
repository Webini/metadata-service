'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('TvCast', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(24),
      },
      tv_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Tv',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      person_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Person',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      character: {
        type: Sequelize.STRING
      },
      order: {
        type: Sequelize.STRING
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('TvCast');
  }
};