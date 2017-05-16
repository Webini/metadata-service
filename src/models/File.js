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
      afterCreate: function(file, options) {
        /** @todo catch handling */
        channelPromise.then(({ publish }) => {
          publish(events.METADATA.CREATED, file.toJSON());
        });
      }
    }
  });

  File.TYPES = {
    unknownMedia: 1,
    movie: 2,
    tv: 4,
  };

  return File;
};