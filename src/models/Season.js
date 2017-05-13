'use strict';
module.exports = function(sequelize, DataTypes) {
  const Season = sequelize.define('Season', {
    air_date: DataTypes.DATE,
    name: DataTypes.STRING,
    overview: DataTypes.TEXT,
    poster_path: DataTypes.STRING,
    season_number: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {        
        Season.hasMany(models.SeasonCast, {
          foreignKey: 'season_id',
          as: 'Cast'
        });

        Season.hasMany(models.SeasonCrew, {
          foreignKey: 'season_id',
          as: 'Crew'
        });

        Season.belongsToMany(models.Image, {
          through: {
            model: models.SeasonBackdrop
          },
          foreignKey: 'season_id',
          otherKey: 'image_id',
          as: 'Backdrops'
        });

        Season.belongsToMany(models.Image, {
          through: {
            model: models.SeasonPoster
          },
          foreignKey: 'season_id',
          otherKey: 'image_id',
          as: 'Posters'
        });

        Season.belongsToMany(models.Video, {
          through: {
            model: models.SeasonVideo
          },
          foreignKey: 'season_id',
          otherKey: 'video_id'
        });
      }
    }
  });
  return Season;
};