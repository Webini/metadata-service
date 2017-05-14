const bus = require('../bus/transmission.js');
const metadataBus = require('../bus/metadata.js');
const EventEmitter = new require('events');
const emitter = new EventEmitter();
const Events = require('./events.js');

bus.subscribe('metadata-transmission-queue', {
  routingKey: 'file.*'
}, async (event) => {
  try {
    //to keep the full speed of small treatments and not overload themoviedb api
    //this message is dispatched to a new queue with a small prefetch 
    if (event.type === Events.CREATED) {
      metadataBus.publish(event.type, event);
    }

    emitter.emit(event.type, event);
    event.handle.ack();
  } catch (e) {
    event.handle.reject();
    emitter.emit(`${event.type}.error`, e, event);
  }
});

bus.on('subscribed', (queue) => {
  emitter.emit(Events.SUBSCRIBED, queue);
});

module.exports = emitter;