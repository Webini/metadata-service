'use strict';
module.exports = function(sequelize, DataTypes) {
  const TvCast = sequelize.define('TvCast', {
    tv_id: DataTypes.INTEGER,
    person_id: DataTypes.INTEGER,
    character: DataTypes.STRING,
    order: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        TvCast.belongsTo(models.Tv, { foreignKey: 'tv_id' });
        TvCast.belongsTo(models.Person, { foreignKey: 'person_id' });
      }
    }
  });
  return TvCast;
};