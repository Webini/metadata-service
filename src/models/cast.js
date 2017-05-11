'use strict';
module.exports = function(sequelize, DataTypes) {
  var Cast = sequelize.define('Cast', {
    name: DataTypes.STRING,
    profile_path: DataTypes.STRING,
    character: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Cast;
};