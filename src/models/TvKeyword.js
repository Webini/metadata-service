'use strict';
module.exports = function(sequelize, DataTypes) {
  const TvKeyword = sequelize.define('TvKeyword', {
    tv_id: DataTypes.INTEGER,
    keyword_id: DataTypes.INTEGER
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return TvKeyword;
};