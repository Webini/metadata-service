'use strict';
module.exports = function(sequelize, DataTypes) {
  var Season = sequelize.define('Season', {
    air_date: DataTypes.DATE,
    name: DataTypes.STRING,
    overview: DataTypes.TEXT,
    poster_path: DataTypes.STRING,
    season_number: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Season;
};