'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Tv', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      backdrop_path: {
        type: Sequelize.STRING
      },
      external_ids_json: {
        type: Sequelize.STRING
      },
      episode_run_time_json: {
        type: Sequelize.STRING
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
      origin_country_json: { 
        type: Sequelize.STRING 
      },
      overview: {
        type: Sequelize.TEXT
      },
      popularity: {
        type: Sequelize.FLOAT
      },
      networks_json: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Tv');
  }
};