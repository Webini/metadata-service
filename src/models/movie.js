'use strict';
module.exports = function(sequelize, DataTypes) {
  var Movie = sequelize.define('Movie', {
    adult: DataTypes.BOOLEAN,
    backdrop_path: DataTypes.STRING,
    budget: DataTypes.BIGINT,
    homepage: DataTypes.STRING,
    imdb_id: DataTypes.STRING,
    original_language: DataTypes.STRING(8),
    original_title: DataTypes.STRING,
    overview: DataTypes.TEXT,
    popularity: DataTypes.FLOAT,
    poster_path: DataTypes.STRING,
    release_date: DataTypes.DATE,
    runtime: DataTypes.INTEGER,
    status: DataTypes.STRING,
    tagline: DataTypes.STRING,
    title: DataTypes.STRING,
    vote_average: DataTypes.FLOAT,
    vote_count: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Movie;
};