const RABBITMQ_URL      = process.env.RABBITMQ_URL;
const LOG_PREFIX        = 'RabbitMQBus';
const winston           = require('winston');
const bus               = require('servicebus');
const _merge            = require('lodash.merge');

function create(params, defaultPublishOptions, defaultSubscribeOptions) {
  const inst = bus.bus(Object.assign({
    url: RABBITMQ_URL,
    log: function(...args) {
      winston.info(LOG_PREFIX, args);
    },
    assertQueuesOnFirstSend: true
  }, params));

  inst._publish = inst.publish;
  inst.publish = function(queueName, message, options = {}, cb) {
    return this._publish.apply(this, [ 
      queueName, 
      message, 
      _merge(defaultPublishOptions, options), 
      cb 
    ]);
  };

  inst._subscribe = inst.subscribe;
  inst.subscribe = function(queueName, options = {}, callback) {
    return this._subscribe.apply(this, [ 
      queueName, 
      _merge(defaultSubscribeOptions, options), 
      callback
    ]);
  };

  return inst;
}

module.exports = create;