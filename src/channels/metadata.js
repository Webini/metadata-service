const connection = require('./connection.js');

module.exports = connection.createChannelAndExchange(
  process.env.METADATA || 'metadata', 
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