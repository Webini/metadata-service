'use strict';
module.exports = function(sequelize, DataTypes) {
  const TvPoster = sequelize.define('TvPoster', {
    tv_id: DataTypes.INTEGER,
    image_id: DataTypes.STRING(32)
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return TvPoster;
};