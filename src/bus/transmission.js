const TRANSMISSION_EXCHANGE = process.env.RABBITMQ_FILE_EXCHANGE || 'transmission-service';
const retry = require('servicebus-retry');

const exchangeOptions = {
  exchangeName: TRANSMISSION_EXCHANGE,
  exchangeOptions: {
    durable: true,
    type: 'topic',
    autoDelete: false
  }
};

const bus = require('./bus.js')({
  prefetch: 5
}, exchangeOptions, Object.assign(exchangeOptions, {
  queueOptions: {
    autoDelete: false, 
    durable: true,
  },
  ack: true
}));

bus.use(bus.correlate());
bus.use(retry({
  store: new retry.RedisStore({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT || 6379
  }),
  maxRetries: 3
}));

module.exports = bus;