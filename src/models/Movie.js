'use strict';
module.exports = function(sequelize, DataTypes) {
  const Movie = sequelize.define('Movie', {
    adult: DataTypes.BOOLEAN,
    backdrop_path: DataTypes.STRING,
    budget: DataTypes.BIGINT,
    homepage: DataTypes.STRING,
    imdb_id: DataTypes.STRING,
    original_language: DataTypes.STRING(8),
    original_title: DataTypes.STRING,
    overview: DataTypes.TEXT,
    popularity: DataTypes.FLOAT,
    poster_path: DataTypes.STRING,
    release_date: DataTypes.DATE,
    runtime: DataTypes.INTEGER,
    status: DataTypes.STRING,
    tagline: DataTypes.STRING,
    title: DataTypes.STRING,
    vote_average: DataTypes.FLOAT,
    vote_count: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Movie.belongsToMany(models.Genre, {
          through: {
            model: models.MovieGenre
          },
          foreignKey: 'movie_id',
          otherKey: 'genre_id'
        });
        
        Movie.belongsToMany(models.ProductionCompany, {
          through: {
            model: models.MovieProductionCompany
          },
          foreignKey: 'movie_id',
          otherKey: 'production_company_id'
        });

        Movie.belongsToMany(models.Video, {
          through: {
            model: models.MovieVideo
          },
          foreignKey: 'movie_id',
          otherKey: 'video_id'
        });

        Movie.hasMany(models.MovieCast, {
          foreignKey: 'movie_id',
          as: 'Cast'
        });

        Movie.hasMany(models.MovieCrew, {
          foreignKey: 'movie_id',
          as: 'Crew'
        });

        Movie.belongsToMany(models.Image, {
          through: {
            model: models.MovieBackdrop
          },
          foreignKey: 'movie_id',
          otherKey: 'image_id',
          as: 'Backdrops'
        });

        Movie.belongsToMany(models.Image, {
          through: {
            model: models.MoviePoster
          },
          foreignKey: 'movie_id',
          otherKey: 'image_id',
          as: 'Posters'
        });

        Movie.belongsToMany(models.Keyword, {
          through: {
            model: models.MovieKeyword
          },
          foreignKey: 'movie_id',
          otherKey: 'keyword_id'
        });
      }
    }
  });

  return Movie;
};