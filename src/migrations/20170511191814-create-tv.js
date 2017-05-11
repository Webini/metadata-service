'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Tvs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      backdrop_path: {
        type: Sequelize.STRING
      },
      external_ids: {
        type: Sequelize.STRING
      },
      episode_run_time: {
        type: Sequelize.INTEGER
      },
      first_air_date: {
        type: Sequelize.DATE
      },
      homepage: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      number_of_episodes: {
        type: Sequelize.INTEGER
      },
      number_of_seasons: {
        type: Sequelize.INTEGER
      },
      original_language: {
        type: Sequelize.STRING
      },
      original_name: {
        type: Sequelize.STRING
      },
      overview: {
        type: Sequelize.TEXT
      },
      popularity: {
        type: Sequelize.FLOAT
      },
      poster_path: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      vote_average: {
        type: Sequelize.FLOAT
      },
      vote_count: {
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
    return queryInterface.dropTable('Tvs');
  }
};