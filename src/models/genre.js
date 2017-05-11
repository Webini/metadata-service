'use strict';

module.exports = function(sequelize, DataTypes) {
  const Genre = sequelize.define('Genre', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Genre;
};