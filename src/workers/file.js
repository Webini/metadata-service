const Events = require('./events.js');

module.exports = function(message, channel, metadataPublish) {
  const event = message.contentData;
  try {
    //to keep the full speed of small treatments and not overload themoviedb api
    //this message is dispatched to a new queue with a small prefetch 
    console.log(event);
    if (event.type === Events.CREATED) {
      metadataPublish(event.type, event);
    }

    channel.ack(message);
  } catch (e) {
    channel.nack(message);
  }
};