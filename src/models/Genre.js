'use strict';

module.exports = function(sequelize, DataTypes) {
  const Genre = sequelize.define('Genre', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Genre.belongsToMany(models.Movie, {
          through: {
            model: models.MovieGenre
          },
          foreignKey: 'genre_id',
          otherKey: 'movie_id',
          as: 'Movies'
        });

        Genre.belongsToMany(models.Tv, {
          through: {
            model: models.TvGenre
          },
          foreignKey: 'genre_id',
          otherKey: 'tv_id',
          as: 'Tv'
        });
      }
    }
  });
  return Genre;
};