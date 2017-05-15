const { connect } = require('amqplib');
const promise = connect(process.env.RABBITMQ_URL);

module.exports = {
  createChannel: async function() {
    return (await promise).createChannel();
  },
  
  /**
   * Create and assert a channel & a new exchange
   * @param {String} exchangeName 
   * @param {Object} { prefetch=null, prefetchGlobal=true, type='topic', exchangeOptions } ExchangeOptions are http://www.squaremobius.net/amqp.node/channel_api.html#channel_assertExchange
   * @returns {Promise<{channel, exchange, publish}>}
   */
  createChannelAndExchange: async function(exchangeName, { prefetch=null, prefetchGlobal=true, type='topic', exchangeOptions }) {
    const channel = await this.createChannel();
    const publish = function(routingKey, content) {
      return channel.publish(exchangeName, routingKey, new Buffer(JSON.stringify(content)));
    };

    await channel.assertExchange(exchangeName, type, exchangeOptions);

    if (prefetch !== null) {
      await channel.prefetch(prefetch, prefetchGlobal);
    }
    
    return { channel, exchange: exchangeName, publish };
  },

  /**
   * @param {Object} channel 
   * @param {String} queueName 
   * @param {String} exchangeName 
   * @param {Object} { dlx=false, routingPattern='#', queueOptions={} } queueOptions are http://www.squaremobius.net/amqp.node/channel_api.html#channel_assertQueue
   * @returns {Promise<String>}
   */
  createAndBindQueue: async function(channel, queueName, exchangeName, { dlx=false, routingPattern='#', queueOptions={} } ) {
    if (dlx) {
      if (!queueOptions.arguments) {
        queueOptions.arguments = {};
      }

      const dlxExchange = queueOptions.arguments['x-dead-letter-exchange'] || `${exchangeName}.dlx`;
      const dlxRoutingKey = queueOptions.arguments['x-dead-letter-routing-key'] || queueName;
      const dlxQueue = `${queueName}.dlx`;

      queueOptions.arguments['x-dead-letter-exchange'] = dlxExchange;
      queueOptions.arguments['x-dead-letter-routing-key'] = dlxRoutingKey;

      await channel.assertExchange(dlxExchange, 'topic', { durable: true });
      await this.createAndBindQueue(channel, dlxQueue, dlxExchange, { routingPattern: dlxRoutingKey, durable: true });
    }

    await channel.assertQueue(queueName, queueOptions);
    await channel.bindQueue(queueName, exchangeName, routingPattern);
    return queueName;
  },

  
  /**
   * @param {Object} channel 
   * @param {String} queueName 
   * @param {Function} callback function(msgContent, message, channel) 
   * @returns {Promise}
   */
  consume: async function(channel, queueName, callback) {
    return await channel.consume(queueName, (msg) => {
      msg.contentData = JSON.parse(msg.content);
      return callback(msg, channel);
    });
  }
};