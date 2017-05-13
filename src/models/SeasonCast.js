'use strict';
module.exports = function(sequelize, DataTypes) {
  const SeasonCast = sequelize.define('SeasonCast', {
    season_id: DataTypes.INTEGER,
    person_id: DataTypes.INTEGER,
    character: DataTypes.STRING,
    order: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        SeasonCast.belongsTo(models.Season, { foreignKey: 'season_id' });
        SeasonCast.belongsTo(models.Person, { foreignKey: 'person_id' });
      }
    }
  });
  return SeasonCast;
};