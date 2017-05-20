const connection = require('../../src/channels/connection.js');
const channel = require('../../src/channels/metadata.js');
const workers = require('../../src/worker.js');
const events = require('../../src/channels/queues/events.js');
const tmdbQueue = require('../../src/channels/queues/tmdb.js');
const waitForMessage = require('../tools/waitForMessage.js');
const assert = require('assert');
const uuid = require('uuid/v4');

describe('Files worker', () => {
  before(() => workers);

  it.only('should create file and dispatch it to tmdb queue', async () => {
    const { fast: fastChannel, bindedExchange } = await channel;
    const filePublish = connection.createPublish(fastChannel, bindedExchange);
    const { emitter: tmdbEmitter } = await tmdbQueue;

    const messageIncoming = waitForMessage(events.METADATA.CREATED, tmdbEmitter, 2000);

    const initialEvent = {
      basename: 'test.mkv',
      id: uuid(),
      length: 42
    };

    filePublish(events.FILE.CREATED, initialEvent);

    const [ message ] = await messageIncoming;
    const content = message.contentData;
    
    assert.strictEqual(content.data.id, initialEvent.id, 'invalid id');
    assert.strictEqual(content.data.length, initialEvent.length, 'invalid length');
    assert.strictEqual(content.objectId, initialEvent.id, 'invalid object id');
    assert.strictEqual(message.fields.routingKey, events.METADATA.CREATED, 'invalid routing key');
  });
});