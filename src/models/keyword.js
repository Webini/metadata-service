'use strict';
module.exports = function(sequelize, DataTypes) {
  var Keyword = sequelize.define('Keyword', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Keyword;
};