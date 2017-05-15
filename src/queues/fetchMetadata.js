const connection = require('../channels/connection.js');
const channelPromise = require('../channels/metadata.js');
const consumer = require('../workers/fetchMetadata.js');
const QUEUE_NAME = 'metadata-fetch-queue';

async function create() {
  const { channel, exchange } = await channelPromise;

  const queue = await connection.createAndBindQueue(channel, QUEUE_NAME, exchange, {
    dlx: true,
    queueOptions: {
      autoDelete: false,
      durable: true
    }
  });

  await connection.consume(channel, queue, consumer);

  return queue;
}

module.exports = create();