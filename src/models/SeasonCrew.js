'use strict';
module.exports = function(sequelize, DataTypes) {
  const SeasonCrew = sequelize.define('SeasonCrew', {
    season_id: DataTypes.INTEGER,
    person_id: DataTypes.INTEGER,
    job: DataTypes.STRING,
    department: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        SeasonCrew.belongsTo(models.Season, { foreignKey: 'season_id' });
        SeasonCrew.belongsTo(models.Person, { foreignKey: 'person_id' });
      }
    }
  });
  return SeasonCrew;
};