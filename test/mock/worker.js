module.exports = function(originalWorker) {
  let onceResolver = null;
  let alwaysCallback = null;

  const mock = function(message, channel) {
    if (onceResolver) {
      const resolver = onceResolver;
      onceResolver = null;
      return resolver({ message, channel });
    } else if (alwaysCallback) {
      alwaysCallback(message, channel);
    } else {
      return originalWorker(message, channel);
    }
  };

  mock.always = function(callback) {
    alwaysCallback = callback;
  };

  mock.unwatch = function() {
    alwaysCallback = null;
    onceResolver = null;
  };

  mock.once = function() {
    return new Promise((resolve) => {
      onceResolver = resolve;
    });
  };  

  return mock;
};