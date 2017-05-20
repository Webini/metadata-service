const Raven    = require('../raven.js');
const events   = require('../channels/queues/events.js');
const { File } = require('../models/index.js');
const path     = require('path');

module.exports = function(message, channel) {
  const { contentData: event } = message;

  if (message.fields.routingKey === events.FILE.CREATED) {
    const extension = path.extname(event.data.basename);

    File
      .create({
        extension,
        basename: event.data.basename,
        length: event.data.length,
        id: event.objectId,
        type: File.TYPES.unknown
      })
      .then(() => {
        channel.ack(message);
      })
      .catch((e) => {
        //1 retry
        channel.nack(message, false, !message.fields.redelivered);
        //this error is critical
        Raven.captureException(e, { extra: { event: message } }, () => process.exit(1));
      });
  }
};