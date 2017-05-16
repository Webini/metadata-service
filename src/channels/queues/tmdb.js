const connection = require('../connection.js');
const channelPromise = require('../metadata.js');
const consumer = require('../../workers/tmdb.js');
const events = require('./events.js');
const QUEUE_NAME = 'metadata-tmdb';

async function create() {
  const { slow: channel, exchange } = await channelPromise;

  const queue = await connection.assertAndBindQueue(channel, QUEUE_NAME, exchange, {
    autoDlx: true,
    queueOptions: {
      routingPattern: events.METADATA.CREATED,
      autoDelete: false,
      durable: true
    }
  });

  await connection.consume(channel, queue, consumer);

  return queue;
}

module.exports = create();