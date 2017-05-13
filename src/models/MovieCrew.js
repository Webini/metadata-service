'use strict';
module.exports = function(sequelize, DataTypes) {
  const MovieCrew = sequelize.define('MovieCrew', {
    movie_id: DataTypes.INTEGER,
    person_id: DataTypes.INTEGER,
    job: DataTypes.STRING,
    department: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        MovieCrew.belongsTo(models.Movie, { foreignKey: 'movie_id' });
        MovieCrew.belongsTo(models.Person, { foreignKey: 'person_id' });
      }
    }
  });
  return MovieCrew;
};