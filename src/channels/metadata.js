const connection = require('./connection.js');
const events = require('./queues/events.js');

/**
 * @returns {Promise.<{ slow, fast, exchange }>} 
 */
async function create() {
  const exchange = process.env.METADATA_EXCHANGE || 'metadata';
  //creation of the slow channel ( 1 message prefetch ) and assertion of the metadata exchange
  const { channel: slowChannel, publish } = await connection.createChannelAndExchange(
    exchange, 
    {
      prefetch: 1, 
      prefetchGlobal: true,
      exchangeOptions: {
        durable: true,
        autoDelete: false
      },
      type: 'topic'
    }
  );

  //creation of the fast channel ( 5 messages prefetch ), the metadata channel is already asserted
  const fastChannel = await connection.createChannel(5, true);

  //bind file.created event from the FILE_EXCHANGE to our metadata exchange
  const fromExchange = process.env.RABBITMQ_FILE_EXCHANGE || 'transmission-service';
  await connection.assertAndBindExchange(fastChannel, fromExchange, exchange, {
    routingPattern: `${events.FILE.CREATED} ${events.FILE.DELETED}`,
    type: 'topic',
    exchangeOptions: {
      durable: true,
      autoDelete: false
    }
  });

  return { slow: slowChannel, fast: fastChannel, publish, exchange };
}

module.exports = create();