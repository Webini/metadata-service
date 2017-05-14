const bus = require('../bus/metadata.js');
const EventEmitter = new require('events');
const emitter = new EventEmitter();

bus.subscribe('metadata-fetch-queue', {
  routingKey: '*'
}, async (event) => {
  try {
    emitter.emit(event.type, event);
    event.handle.ack();
  } catch (e) {
    event.handle.reject();
    emitter.emit(`${event.type}.error`, e, event);
  }
});

bus.on('subscribed', (queue) => {
  emitter.emit('subscribed', queue);
});

module.exports = emitter;