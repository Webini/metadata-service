'use strict';
module.exports = function(sequelize, DataTypes) {
  var ProductionCompany = sequelize.define('ProductionCompany', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return ProductionCompany;
};