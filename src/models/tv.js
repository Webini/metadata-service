'use strict';
module.exports = function(sequelize, DataTypes) {
  var Tv = sequelize.define('Tv', {
    backdrop_path: DataTypes.STRING,
    external_ids: DataTypes.STRING,
    episode_run_time: DataTypes.INTEGER,
    first_air_date: DataTypes.DATE,
    homepage: DataTypes.STRING,
    name: DataTypes.STRING,
    number_of_episodes: DataTypes.INTEGER,
    number_of_seasons: DataTypes.INTEGER,
    original_language: DataTypes.STRING,
    original_name: DataTypes.STRING,
    overview: DataTypes.TEXT,
    popularity: DataTypes.FLOAT,
    poster_path: DataTypes.STRING,
    status: DataTypes.STRING,
    type: DataTypes.STRING,
    vote_average: DataTypes.FLOAT,
    vote_count: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Tv;
};