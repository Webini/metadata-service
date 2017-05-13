'use strict';
module.exports = function(sequelize, DataTypes) {
  const ProductionCompany = sequelize.define('ProductionCompany', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        ProductionCompany.belongsToMany(models.Movie, {
          through: {
            model: models.MovieProductionCompany
          },
          foreignKey: 'production_company_id',
          otherKey: 'movie_id'
        });
      }
    }
  });
  return ProductionCompany;
};