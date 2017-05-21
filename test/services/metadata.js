const models   = require('../../src/models/index.js');
const metadata = require('../../src/services/metadata.js');
const assert   = require('assert');
const uuid     = require('uuid/v4');

describe('Metadata', () => {
  const { Movie, Tv, File, Episode } = models;
  const tvId = 1;
  const seasonNumber = 1;
  const episodeNumber = 2;

  afterEach(async () => {
    await Tv.destroy({ cascade: true, where: { id: { $gte: 0 } } });
    await Movie.destroy({ cascade: true, where: { id: { $gte: 0 } } });
  });

  it('should retreive and associate episode', async () => {
    const file = File.build({
      id: uuid(),
      name: 'Test tv.mkv'
    });

    await metadata.assignTv(file, tvId, seasonNumber, episodeNumber);
    assert.ok(file.episode_id, 'No episode id');
    assert.strictEqual(file.type, File.TYPES.tv, 'Invalid type');
  });

  it(`should update tv id ${tvId}`, async () => {
    const file = File.build({
      id: uuid(),
      name: 'Test update tv.mkv'
    });

    await metadata.assignTv(file, tvId, seasonNumber, episodeNumber);
    await Episode.destroy({ where: { id: file.episode_id } });
    await metadata.assignTv(file, tvId, seasonNumber, episodeNumber);
    assert.ok(file.episode_id, 'No episode id');
    assert.strictEqual(file.type, File.TYPES.tv, 'Invalid type');
  });

  it('should not found movie', async () => {
    const file = File.build({
      id: uuid(),
      name: 'test 404 movie.mkv'
    });
    await metadata.assignMovie(file, 1);

    assert.ok(!file.movie_id, 'Movie id found');
    assert.strictEqual(file.type, File.TYPES.unknownMedia, 'Invalid type');
  });

  it('should found movie', async () => {
    const file = File.build({
      id: uuid(),
      name: 'test movie.mkv'
    });
    await metadata.assignMovie(file, 2);

    assert.ok(file.movie_id, 'No movie id found');
    assert.strictEqual(file.type, File.TYPES.movie, 'Invalid type');
  });
});