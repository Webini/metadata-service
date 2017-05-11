'use strict';
module.exports = function(sequelize, DataTypes) {
  var Crew = sequelize.define('Crew', {
    name: DataTypes.STRING,
    department: DataTypes.STRING,
    job: DataTypes.STRING,
    profile_path: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Crew;
};