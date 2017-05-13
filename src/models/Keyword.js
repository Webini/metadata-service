'use strict';
module.exports = function(sequelize, DataTypes) {
  const Keyword = sequelize.define('Keyword', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Keyword.belongsToMany(models.Movie, {
          through: {
            model: models.MovieKeyword
          },
          foreignKey: 'keyword_id',
          otherKey: 'movie_id'
        });

        Keyword.belongsToMany(models.Tv, {
          through: {
            model: models.TvKeyword
          },
          foreignKey: 'keyword_id',
          otherKey: 'tv_id'
        });
      }
    }
  });
  return Keyword;
};