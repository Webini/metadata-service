'use strict';
module.exports = function(sequelize, DataTypes) {
  const MovieKeyword = sequelize.define('MovieKeyword', {
    movie_id: DataTypes.INTEGER,
    keyword_id: DataTypes.INTEGER
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return MovieKeyword;
};