'use strict';
module.exports = function(sequelize, DataTypes) {
  const TvCrew = sequelize.define('TvCrew', {
    tv_id: DataTypes.INTEGER,
    person_id: DataTypes.INTEGER,
    job: DataTypes.STRING,
    department: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        TvCrew.belongsTo(models.Tv, { foreignKey: 'tv_id' });
        TvCrew.belongsTo(models.Person, { foreignKey: 'person_id' });
      }
    }
  });
  return TvCrew;
};