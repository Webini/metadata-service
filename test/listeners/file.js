const workerLoaded = require('../../src/worker.js');
const transmissionPromise = require('../../src/channels/transmission.js');
const Events = require('../../src/workers/events.js');
const assert = require('assert');

function waitForMessage(eventName, emitter, timeout = 2000) {
  const messagePromise = new Promise((resolve) => {
    emitter.prependOnceListener(eventName, (data) => {
      resolve(data);
    });
  });

  return Promise.race([
    messagePromise, 
    new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('Result timeout')), timeout);
    })
  ]);
}

describe('File listener', function() {
  this.timeout(10000);

  before(() => {
    return workerLoaded;
  });
  
  it.only('should propagate new file to fetch metadata queue', async () => {
    const message = {
      type: Events.CREATED,
      id: 1337
    };
    const { publish } = await transmissionPromise;
    publish(message.type, message);

    return new Promise((resolve) => setTimeout(resolve, 5000));
   // const result = await waitForMessage(Events.CREATED, fetchMetadataEmitter);
    //assert.strictEqual(message.id, result.id);
  });
});