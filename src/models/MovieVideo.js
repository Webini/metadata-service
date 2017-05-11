'use strict';
module.exports = function(sequelize, DataTypes) {
  const MovieVideo = sequelize.define('MovieVideo', {
    movie_id: DataTypes.INTEGER,
    video_id: DataTypes.STRING(24)
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return MovieVideo;
};