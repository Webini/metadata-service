const channelPromise = require('../channels/metadata.js');
const events = require('../channels/queues/events.js');

module.exports = function(sequelize, DataTypes) {
  const modelName = 'File';
  const File = sequelize.define(modelName, {
    basename: DataTypes.STRING(1024),
    title: DataTypes.STRING(1024),
    extension: DataTypes.STRING(128),
    length: DataTypes.BIGINT.UNSIGNED,
    type: DataTypes.INTEGER.UNSIGNED
  }, {
    classMethods: {
      associate: function(models) {
        File.belongsTo(models.Movie, { foreignKey: 'movie_id' });
        File.belongsTo(models.Episode, { foreignKey: 'episode_id' });
      }
    },
    hooks: {
      afterCreate: (file, options) => {
        channelPromise
          .then(({ publish }) => {
            publish(events.METADATA.CREATED, file.toJSON());
          })
        ;
      },
      afterDestroy: (file, options) => {
        channelPromise
          .then(({ publish }) => {
            publish(events.METADATA.DELETED, file.toJSON());
          })
        ;
      },
      afterUpdate: (file, options) => {
        if (file.changed('movie_id') || file.changed('episode_id')) {
          channelPromise
            .then(({ publish }) => {
              publish(events.METADATA.FOUND, Object.assign({
                model: modelName
              }, file.toJSON()));
            })
          ;
        }
      }
    }
  });

  File.TYPES = {
    unknown: 1,
    unknownMedia: 2,
    movie: 4,
    tv: 8,
  };

  return File;
};