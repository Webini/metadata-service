'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('MovieCast', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(24),
      },
      movie_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Movie',
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
        type: Sequelize.INTEGER
      }
    }, {
      charset: 'utf8',
      collate: 'utf8_unicode_ci'
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('MovieCast');
  }
};