'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Videos', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(24)
      },
      name: {
        type: Sequelize.STRING
      },
      iso_639_1: {
        type: Sequelize.STRING(2)
      },
      iso_3116_1: {
        type: Sequelize.STRING(2)
      },
      key: {
        type: Sequelize.STRING
      },
      site: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      size: {
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
    return queryInterface.dropTable('Videos');
  }
};