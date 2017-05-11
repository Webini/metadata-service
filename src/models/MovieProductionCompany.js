'use strict';
module.exports = function(sequelize, DataTypes) {
  const MovieProductionCompany = sequelize.define('MovieProductionCompany', {
    movie_id: DataTypes.INTEGER,
    production_company_id: DataTypes.INTEGER
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return MovieProductionCompany;
};