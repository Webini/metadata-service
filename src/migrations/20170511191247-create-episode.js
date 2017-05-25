'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Episode', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      air_date: {
        type: Sequelize.DATE
      },
      episode_number: {
        type: Sequelize.INTEGER
      },
      overview: {
        type: Sequelize.TEXT
      },
      still_path: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      vote_average: {
        type: Sequelize.FLOAT
      },
      vote_count: {
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
    return queryInterface.dropTable('Episode');
  }
};