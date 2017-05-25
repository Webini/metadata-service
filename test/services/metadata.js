const models   = require('../../src/models/index.js');
const metadata = require('../../src/services/metadata.js');
const assert   = require('assert');
const uuid     = require('uuid/v4');
const emptyDb  = require('../tools/emptyDb.js');

describe('Metadata', () => {
  const { File, Episode } = models;
  const tvId = 1;

  afterEach(emptyDb);

  it('should retreive and associate episode', async () => {
    const file = File.build({
      id: uuid(),
      basename: 'Hannibal s01e01.mkv'
    });
    await metadata.assign(file);
    assert.ok(file.episode_id, 'No episode id');
    assert.strictEqual(file.type, File.TYPES.tv, 'Invalid type');
  });

  it(`should update tv id ${tvId}`, async () => {
    const file = File.build({
      id: uuid(),
      basename: 'Hannibal s01e01.mkv'
    });

    await metadata.assign(file);
    await Episode.destroy({ where: { id: file.episode_id } });
    await metadata.assign(file);
    assert.ok(file.episode_id, 'No episode id');
    assert.strictEqual(file.type, File.TYPES.tv, 'Invalid type');
  });

  it('should not found movie', async () => {
    const file = File.build({
      id: uuid(),
      basename: 'test 404 movie.mkv'
    });
    await metadata.assignMovie(file, 1);

    assert.ok(!file.movie_id, 'Movie id found');
    assert.strictEqual(file.type, File.TYPES.unknownMedia, 'Invalid type');
  });

  it('should found movie', async () => {
    const file = File.build({
      id: uuid(),
      basename: 'Birdman.mkv'
    });
    await metadata.assign(file);

    assert.ok(file.movie_id, 'No movie id found');
    assert.strictEqual(file.type, File.TYPES.movie, 'Invalid type');
  }); 

  it('should found serie', async () => {
    const file = File.build({
      id: uuid(),
      basename: 'Peaky Blinders.S01.E01.mkv'
    });
    await metadata.assign(file);

    assert.ok(file.episode_id, 'No serie id found');
    assert.strictEqual(file.type, File.TYPES.tv, 'Invalid type');
  }); 
});