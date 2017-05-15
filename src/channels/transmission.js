const connection = require('./connection.js');

module.exports = connection.createChannelAndExchange(
  process.env.RABBITMQ_FILE_EXCHANGE || 'transmission-service', 
  {
    prefetch: 5, 
    prefetchGlobal: true,
    exchangeOptions: {
      durable: true,
      autoDelete: false
    },
    type: 'topic'
  }
);