const METADATA_EXCHANGE = process.env.METADATA || 'metadata';
const retry = require('servicebus-retry');

const exchangeOptions = {
  exchangeName: METADATA_EXCHANGE,
  exchangeOptions: {
    durable: true,
    type: 'topic',
    autoDelete: false
  }
};

const bus = require('./bus.js')({
  prefetch: 1
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
  maxRetries: 1
}));

module.exports = bus;