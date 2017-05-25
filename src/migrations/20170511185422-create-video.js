'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Video', {
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
    return queryInterface.dropTable('Video');
  }
};