'use strict';
module.exports = function(sequelize, DataTypes) {
  const MovieCast = sequelize.define('MovieCast', {
    movie_id: DataTypes.INTEGER,
    person_id: DataTypes.INTEGER,
    character: DataTypes.STRING,
    order: DataTypes.INTEGER
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        MovieCast.belongsTo(models.Movie, { foreignKey: 'movie_id' });
        MovieCast.belongsTo(models.Person, { foreignKey: 'person_id' });
      }
    }
  });
  return MovieCast;
};