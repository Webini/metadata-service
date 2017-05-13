'use strict';
module.exports = function(sequelize, DataTypes) {
  const Person = sequelize.define('Person', {
    name: DataTypes.STRING,
    profile_path: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Person.hasMany(models.MovieCast, {
          foreignKey: 'person_id',
          as: 'MovieCast'
        });
        
        Person.hasMany(models.MovieCrew, {
          foreignKey: 'person_id',
          as: 'MovieCrew'
        });

        Person.hasMany(models.EpisodeGuestStar, {
          foreignKey: 'person_id',
          as: 'EpisodeGuestStar'
        });

        Person.hasMany(models.SeasonCast, {
          foreignKey: 'person_id',
          as: 'SeasonCast'
        });

        Person.hasMany(models.SeasonCrew, {
          foreignKey: 'person_id',
          as: 'SeasonCrew'
        });
      }
    }
  });
  return Person;
};