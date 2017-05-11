'use strict';
module.exports = function(sequelize, DataTypes) {
  const MovieGenre = sequelize.define('MovieGenre', {
    movie_id: DataTypes.INTEGER,
    genre_id: DataTypes.INTEGER
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return MovieGenre;
};