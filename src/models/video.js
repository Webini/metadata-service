'use strict';
module.exports = function(sequelize, DataTypes) {
  var Video = sequelize.define('Video', {
    name: DataTypes.STRING,
    iso_639_1: DataTypes.STRING(2),
    iso_3116_1: DataTypes.STRING(2),
    key: DataTypes.STRING,
    site: DataTypes.STRING,
    type: DataTypes.STRING,
    size: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Video;
};