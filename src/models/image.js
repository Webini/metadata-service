'use strict';
module.exports = function(sequelize, DataTypes) {
  var Image = sequelize.define('Image', {
    aspect_ratio: DataTypes.FLOAT,
    file_path: DataTypes.STRING,
    height: DataTypes.INTEGER,
    iso_639_1: DataTypes.STRING(2),
    vote_average: DataTypes.FLOAT,
    vote_count: DataTypes.INTEGER,
    width: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Image;
};