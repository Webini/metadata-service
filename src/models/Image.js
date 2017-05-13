'use strict';
module.exports = function(sequelize, DataTypes) {
  const Image = sequelize.define('Image', {
    aspect_ratio: DataTypes.FLOAT,
    file_path: DataTypes.STRING,
    height: DataTypes.INTEGER,
    iso_639_1: DataTypes.STRING(2),
    vote_average: DataTypes.FLOAT,
    vote_count: DataTypes.INTEGER,
    width: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Image.belongsToMany(models.Movie, {
          through: {
            model: models.MoviePoster
          },
          foreignKey: 'image_id',
          otherKey: 'movie_id',
          as: 'MoviePosters'
        });

        Image.belongsToMany(models.Movie, {
          through: {
            model: models.MovieBackdrop
          },
          foreignKey: 'image_id',
          otherKey: 'movie_id',
          as: 'MovieBackdrops'
        });

        Image.belongsToMany(models.Season, {
          through: {
            model: models.SeasonPoster
          },
          foreignKey: 'image_id',
          otherKey: 'season_id',
          as: 'SeasonPosters'
        });

        Image.belongsToMany(models.Season, {
          through: {
            model: models.SeasonBackdrop
          },
          foreignKey: 'image_id',
          otherKey: 'season_id',
          as: 'SeasonBackdrops'
        });

        Image.belongsToMany(models.Tv, {
          through: {
            model: models.TvPoster
          },
          foreignKey: 'image_id',
          otherKey: 'tv_id',
          as: 'TvPosters'
        });

        Image.belongsToMany(models.Tv, {
          through: {
            model: models.TvBackdrop
          },
          foreignKey: 'image_id',
          otherKey: 'tv_id',
          as: 'TvBackdrops'
        });
      }
    }
  });
  return Image;
};