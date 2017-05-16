const events   = require('../channels/queues/events.js');
const { File } = require('../models/index.js');
const path     = require('path');

module.exports = function(message, channel) {
  const { contentData: event } = message;

  if (message.fields.routingKey === events.FILE.CREATED) {
    const extension = path.extname(event.basename);

    File
      .create({
        extension,
        basename: event.data.basename,
        length: event.data.length,
        id: event.objectId
      })
      .then(() => {
        channel.ack(message);
      })
      .catch(() => {
        //1 retry
        channel.nack(message, false, !message.fields.redelivered);
        throw new Error('Cannot create new file');
      });
  }
};