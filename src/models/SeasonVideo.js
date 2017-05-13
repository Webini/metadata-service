'use strict';
module.exports = function(sequelize, DataTypes) {
  const SeasonVideo = sequelize.define('SeasonVideo', {
    season_id: DataTypes.INTEGER,
    video_id: DataTypes.STRING(32)
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return SeasonVideo;
};