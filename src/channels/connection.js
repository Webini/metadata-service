const { connect } = require('amqplib');
const promise = connect(process.env.RABBITMQ_URL);

module.exports = {
  /**
   * Create and assert a channel & a new exchange
   * @param {String} exchangeName 
   * @param {Object} { prefetch=null, prefetchGlobal=true, type='topic', exchangeOptions } ExchangeOptions are http://www.squaremobius.net/amqp.node/channel_api.html#channel_assertExchange
   * @returns {Promise.<{channel, exchange, publish}>}
   */
  createChannelAndExchange: async function(exchangeName, { prefetch=null, prefetchGlobal=true, type='topic', exchangeOptions }) {
    const channel = await this.createChannel(prefetch, prefetchGlobal);
    const publish = this.createPublish(channel, exchangeName);
    await channel.assertExchange(exchangeName, type, exchangeOptions);
    
    return { channel, exchange: exchangeName, publish };
  },

  /**
   * @param {Object} channel 
   * @param {String} exchangeName 
   * @returns {function}
   */
  createPublish: async function(channel, exchangeName) {
    /**
     * @param {string} routingKey 
     * @param {any} content 
     * @returns {Boolean}
     */
    return function(routingKey, content, objectId) {
      return channel.publish(exchangeName, routingKey, new Buffer(JSON.stringify({
        date: new Date(),
        objectId: objectId || (content && content.id ? content.id : null),
        data: content
      })));
    };
  },

  /**
   * @param {number} [prefetch=null] 
   * @param {boolean} [prefetchGlobal=true] 
   * @returns 
   */
  createChannel: async function(prefetch=null, prefetchGlobal=true) {
    const channel = (await promise).createChannel();

    if (prefetch !== null) {
      await channel.prefetch(prefetch, prefetchGlobal);
    }

    return channel;
  },

  /**
   * Create and bind exchange @exchangeName to @destExchangeName using routingPattern
   * @param {Object} channel 
   * @param {String} exchangeName 
   * @param {String} destExchangeName 
   * @param {Object} { routingPattern='#', type='topic', exchangeOptions } 
   */
  assertAndBindExchange: async function(channel, exchangeName, destExchangeName, { routingPattern='#', type='topic', exchangeOptions }) {
    await channel.assertExchange(exchangeName, type, exchangeOptions);
    await channel.bindExchange(destExchangeName, exchangeName, routingPattern);
  },

  /**
   * @param {Object} channel 
   * @param {String} queueName 
   * @param {String} exchangeName 
   * @param {Object} { autoDlx=false, routingPattern='#', queueOptions={} } queueOptions are http://www.squaremobius.net/amqp.node/channel_api.html#channel_assertQueue
   * @returns {Promise.<String>}
   */
  assertAndBindQueue: async function(channel, queueName, exchangeName, { autoDlx=false, routingPattern='#', queueOptions={} } ) {
    if (autoDlx) {
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