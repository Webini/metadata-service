'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Image', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(32)
      },
      aspect_ratio: {
        type: Sequelize.FLOAT
      },
      file_path: {
        type: Sequelize.STRING
      },
      height: {
        type: Sequelize.INTEGER
      },
      iso_639_1: {
        type: Sequelize.STRING(2)
      },
      vote_average: {
        type: Sequelize.FLOAT
      },
      vote_count: {
        type: Sequelize.INTEGER
      },
      width: {
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
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Image');
  }
};