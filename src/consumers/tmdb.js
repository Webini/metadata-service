const events = require('../channels/queues/events.js');
const metadata = require('../services/metadata.js');
const { File } = require('../models/index.js');

module.exports = async (message) => {
  const { contentData: event } = message;
  const eventName = message.fields.routingKey;
  const file = await File.findOne({ where: { id: event.objectId } });

  if (!file) {
    throw new Error('File not found');
  }

  if (eventName === events.METADATA.CREATED) {
    await metadata.assign(file);
    await file.save();
  }
};