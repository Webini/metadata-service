'use strict';
module.exports = function(sequelize, DataTypes) {
  const TvBackdrop = sequelize.define('TvBackdrop', {
    tv_id: DataTypes.INTEGER,
    image_id: DataTypes.STRING(32)
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return TvBackdrop;
};