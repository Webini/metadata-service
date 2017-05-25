const identify = require('../../src/services/identify.js');
const db = require('../../src/models/index.js');
const assert = require('assert');

describe('Identify', () => {
  it('should retreive serie', async () => {
    const result = await identify('test.E02.mkv');
    assert.equal(result.season, 1, 'Invalid season');
    assert.ok(result.tv, 'Invalid metadata type');
    assert.equal(result.type, db.File.TYPES.tv, 'Invalid media type');
  });

  it('should not retreive tv', async () => {
    const result = await identify('test.S01.mkv');
    assert.equal(result.type, db.File.TYPES.unknownMedia, 'Invalid media type');
  });

  it('should retreive movie', async () => {
    const result = await identify('L\'arme fatale.avi');
    assert.ok(result.movie, 'Invalid metadata type');
    assert.equal(result.type, db.File.TYPES.movie, 'Invalid media type');
  });

  it('should identify an unknown media', async () => {
    const result = await identify('Ce.fichier.n\'existe.pas.mkv');
    assert.equal(result.type, db.File.TYPES.unknownMedia, 'Invalid media type');
  });

  it('should identify an unknown file', async () => {
    const result = await identify('Ce.fichier.n\'existe.pas.txt');
    assert.equal(result.type, db.File.TYPES.unknown, 'Invalid media type');
  });
});