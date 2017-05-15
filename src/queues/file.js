const connection = require('../channels/connection.js');
const channelPromise = require('../channels/transmission.js');
const metadataPromise = require('../channels/metadata.js');
const consumer = require('../workers/file.js');
const QUEUE_NAME = 'metadata-transmission-queue';

async function create() {
  const { channel, exchange } = await channelPromise;
  const { publish: publishMetadata } = await metadataPromise;
  
  const queue = await connection.createAndBindQueue(channel, QUEUE_NAME, exchange, {
    dlx: true,
    routingPattern: 'file.*',
    queueOptions: {
      autoDelete: false,
      durable: true
    }
  });

  await connection.consume(channel, queue, (msg, channel) => {
    return consumer(msg, channel, publishMetadata);
  });

  return queue;
}

module.exports = create();