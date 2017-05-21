module.exports = function waitForMessage(eventName, emitter, timeout = 2000, isWanted = null) {
  const messagePromise = new Promise((resolve) => {
    function bind() {
      emitter.once(eventName, function() {
        if (typeof isWanted === 'function'){
          if (isWanted.apply(isWanted, arguments)) {
            return resolve(arguments);
          } else {
            return bind();
          }
        } 

        resolve(arguments);
      });
    }
    
    bind();
  });

  return Promise.race([
    messagePromise, 
    new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('Result timeout')), timeout);
    })
  ]);
};