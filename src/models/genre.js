'use strict';

module.exports = function(sequelize, DataTypes) {
  const Genre = sequelize.define('Genre', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Genre.belongsToMany(models.Movie, {
          through: {
            model: models.MovieGenre
          },
          foreignKey: 'genre_id'
        });
      }
    }
  });
  return Genre;
};