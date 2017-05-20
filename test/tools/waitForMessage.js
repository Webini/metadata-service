module.exports = function waitForMessage(eventName, emitter, timeout = 2000) {
  const messagePromise = new Promise((resolve) => {
    emitter.once(eventName, function() {
      resolve(arguments);
    });
  });

  return Promise.race([
    messagePromise, 
    new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('Result timeout')), timeout);
    })
  ]);
};