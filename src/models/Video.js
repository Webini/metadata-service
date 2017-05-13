'use strict';
module.exports = function(sequelize, DataTypes) {
  const Video = sequelize.define('Video', {
    name: DataTypes.STRING,
    iso_639_1: DataTypes.STRING(2),
    iso_3116_1: DataTypes.STRING(2),
    key: DataTypes.STRING,
    site: DataTypes.STRING,
    type: DataTypes.STRING,
    size: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Video.belongsToMany(models.Movie, {
          through: {
            model: models.MovieVideo
          },
          foreignKey: 'video_id',
          otherKey: 'movie_id',
          as: 'Movies'
        });

        Video.belongsToMany(models.Season, {
          through: {
            model: models.SeasonVideo
          },
          foreignKey: 'video_id',
          otherKey: 'season_id', 
          as: 'Seasons',
        });
      }
    }
  });
  return Video;
};