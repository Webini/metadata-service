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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Season');
  }
};