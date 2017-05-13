'use strict';
module.exports = function(sequelize, DataTypes) {
  const TvGenre = sequelize.define('TvGenre', {
    tv_id: DataTypes.INTEGER,
    genre_id: DataTypes.INTEGER
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return TvGenre;
};