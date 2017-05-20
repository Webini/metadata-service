const events = require('../channels/queues/events.js');
const identify = require('../services/identify.js');

module.exports = async (message) => {
  const { contentData: event } = message;
  const eventName = message.fields.routingKey;

  if (eventName === events.METADATA.CREATED) {
    const filedata = await identify(event.data.basename);

  }
};