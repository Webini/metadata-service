'use strict';
module.exports = function(sequelize, DataTypes) {
  const TvVideo = sequelize.define('TvVideo', {
    tv_id: DataTypes.INTEGER,
    video_id: DataTypes.STRING(24)
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return TvVideo;
};