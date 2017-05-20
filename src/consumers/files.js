const events   = require('../channels/queues/events.js');
const { File } = require('../models/index.js');
const path     = require('path');

module.exports = async (message) => {
  const { contentData: event } = message;
  const eventName = message.fields.routingKey;

  if (eventName === events.FILE.CREATED) {
    const extension = path.extname(event.data.basename);
    await File.create({
      extension,
      basename: event.data.basename,
      length: event.data.length,
      id: event.objectId,
      type: File.TYPES.unknown
    });
  } else if (eventName === events.FILE.DELETED) {
    await File.destroy({ where: { id: event.objectId }, individualHooks: true });
  }
};