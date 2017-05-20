const channelPromise = require('../channels/metadata.js');
const events = require('../channels/queues/events.js');

module.exports = function(sequelize, DataTypes) {
  const File = sequelize.define('File', {
    basename: DataTypes.STRING(1024),
    extension: DataTypes.STRING(128),
    length: DataTypes.BIGINT.UNSIGNED,
    type: DataTypes.INTEGER.UNSIGNED
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
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