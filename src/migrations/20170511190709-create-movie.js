'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Movie', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      adult: {
        type: Sequelize.BOOLEAN
      },
      backdrop_path: {
        type: Sequelize.STRING
      },
      budget: {
        type: Sequelize.BIGINT
      },
      homepage: {
        type: Sequelize.STRING
      },
      imdb_id: {
        type: Sequelize.STRING
      },
      original_language: {
        type: Sequelize.STRING(8)
      },
      original_title: {
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
      release_date: {
        type: Sequelize.DATE
      },
      runtime: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      tagline: {
        type: Sequelize.STRING
      },
      title: {
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
    return queryInterface.dropTable('Movie');
  }
};