'use strict';
module.exports = function(sequelize, DataTypes) {
  const Episode = sequelize.define('Episode', {
    air_date: DataTypes.DATE,
    episode_number: DataTypes.INTEGER,
    overview: DataTypes.TEXT,
    still_path: DataTypes.STRING,
    vote_average: DataTypes.FLOAT,
    vote_count: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Episode.hasMany(models.EpisodeGuestStar, {
          foreignKey: 'episode_id',
          as: 'GuestStars'
        });

        Episode.belongsTo(models.Season, { foreignKey: 'season_id' });
      }
    }
  });
  return Episode;
};