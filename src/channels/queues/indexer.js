const EventEmitter = require('events');
const connection = require('../connection.js');
const channelPromise = require('../metadata.js');
const consumer = require('../../consumers/indexer.js');
const events = require('./events.js');
const QUEUE_NAME = 'metadata-indexer';

async function create() {
  const { fast: channel, exchange } = await channelPromise;

  const queue = await connection.assertAndBindQueue(channel, QUEUE_NAME, exchange, {
    autoDlx: true,
    routingPattern: events.METADATA.FOUND,
    queueOptions: {
      autoDelete: false,
      durable: true
    }
  });

  const emitter = new EventEmitter();
  await connection.consume(channel, queue, (msg, channel) => {
    emitter.emit(msg.fields.routingKey, msg, channel);
    return consumer(msg, channel);
  });

  return { queue, emitter };
}

module.exports = create();