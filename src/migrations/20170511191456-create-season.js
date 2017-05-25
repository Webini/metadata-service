'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Season', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      air_date: {
        type: Sequelize.DATE
      },
      name: {
        type: Sequelize.STRING
      },
      overview: {
        type: Sequelize.TEXT
      },
      poster_path: {
        type: Sequelize.STRING
      },
      season_number: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {
      charset: 'utf8',
      collate: 'utf8_unicode_ci'
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Season');
  }
};