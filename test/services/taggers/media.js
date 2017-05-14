const MediaTagger = require('../../../src/services/taggers/media.js');
const db = require('../../../src/models/index.js');
const assert = require('assert');

describe('MediaTagger', () => {
  it('should retreive serie', async () => {
    const result = await MediaTagger('test.E02.mkv');
    assert.equal(result.season, 1, 'Invalid season');
    assert.ok(result.tv, 'Invalid metadata type');
    assert.equal(result.type, db.File.TYPES.tv, 'Invalid media type');
  });

  it('should retreive movie', async () => {
    const result = await MediaTagger('L\'arme fatale');
    assert.ok(result.movie, 'Invalid metadata type');
    assert.equal(result.type, db.File.TYPES.movie, 'Invalid media type');
  });
});