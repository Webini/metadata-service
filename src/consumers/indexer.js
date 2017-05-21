const events   = require('../channels/queues/events.js');
const { File } = require('../models/index.js');
const path     = require('path');

module.exports = async (message) => {
  const { contentData: event } = message;
  const eventName = message.fields.routingKey;
};