const connection = require('../connection.js');
const channelPromise = require('../metadata.js');
const consumer = require('../../workers/fetchMetadata.js');
const QUEUE_NAME = 'metadata-files';

async function create() {
  const { fast: channel, exchange } = await channelPromise;

  const queue = await connection.assertAndBindQueue(channel, QUEUE_NAME, exchange, {
    autoDlx: true,
    queueOptions: {
      routingPattern: 'file.*',
      autoDelete: false,
      durable: true
    }
  });

  await connection.consume(channel, queue, consumer);

  return queue;
}

module.exports = create();