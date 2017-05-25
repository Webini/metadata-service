'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('SeasonCast', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(24),
      },
      season_id: {
        type: Sequelize.INTEGER
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
        type: Sequelize.INTEGER
      }
    }, {
      charset: 'utf8',
      collate: 'utf8_unicode_ci'
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('SeasonCast');
  }
};