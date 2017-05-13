'use strict';
module.exports = function(sequelize, DataTypes) {
  const EpisodeGuestStar = sequelize.define('EpisodeGuestStar', {
    episode_id: DataTypes.INTEGER,
    person_id: DataTypes.INTEGER,
    character: DataTypes.STRING,
    order: DataTypes.INTEGER
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        EpisodeGuestStar.belongsTo(models.Episode, { foreignKey: 'episode_id' });
        EpisodeGuestStar.belongsTo(models.Person, { foreignKey: 'person_id' });
      }
    }
  });
  return EpisodeGuestStar;
};