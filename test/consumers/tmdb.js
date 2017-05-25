const workers = require('../../src/worker.js');
const events = require('../../src/channels/queues/events.js');
const indexerQueue = require('../../src/channels/queues/indexer.js');
const waitForMessage = require('../tools/waitForMessage.js');
const { File } = require('../../src/models/index.js');
const assert = require('assert');
const uuid = require('uuid/v4');
const emptyDb = require('../tools/emptyDb.js');

describe('Tmdb consumer', () => {
  before(() => workers);
  after(emptyDb);
  
  it('should fetch metadata', async () => {
    const { emitter: indexerEmitter } = await indexerQueue;
    const id = uuid();

    const messageIncoming = waitForMessage(
      events.METADATA.FOUND, 
      indexerEmitter, 
      10000, 
      (message) => (message.contentData.objectId === id)
    );

    const file = await File.create({
      basename: 'Lethal weapon.mkv',
      id,
      length: 42
    });

    const [ message ] = await messageIncoming;
    const content = message.contentData;
    
    assert.strictEqual(content.data.id, file.id, 'invalid id');
    assert.strictEqual(content.data.type, File.TYPES.movie, 'invalid type');
    assert.ok(content.data.movie_id, 'invalid movie id');
    assert.strictEqual(content.data.model, 'File', 'Invalid model type');
    assert.strictEqual(message.fields.routingKey, events.METADATA.FOUND, 'invalid routing key');

    await file.destroy();
  });

});