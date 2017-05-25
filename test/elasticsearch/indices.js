const sequelizeFixtures = require('sequelize-fixtures');
const models = require('../../src/models/index.js');
const es = require('../../src/elastic.js');
const { search: searchIndex } = require('../../src/indices/index.js');
const emptyDb = require('../tools/emptyDb.js');

describe.only('Elasticsearch', () => {
  const { Movie, Tv, Season, Episode, File } = models;

  /*before(async () => {
    //await emptyDb();
    //delete and recreate es index
    if (await es.indices.exists({ index: searchIndex.definition.index })) {
      await es.indices.close({ index: searchIndex.definition.index });
      await es.indices.delete({ index: searchIndex.definition.index });
    } 
    await es.indices.create(searchIndex.definition);

    //return await sequelizeFixtures.loadFile(`${__dirname}/../assets/search_fixtures.json`, models);
  });*/

  //after(emptyDb);

  it('should index TV', async () => {
    const [ tv ] = await Tv.findAll();
    await searchIndex.indexTv(tv);
  });

  it('should index Seasons', async () => {
    const seasons = await Season.findAll();
    await Promise.all(
      seasons.map(async (season) => {
        await searchIndex.indexSeason(season);
      })
    );
  });

  it('should index Episodes', async () => {
    const episodes = await Episode.findAll();
    await Promise.all(
      episodes.map(async (ep) => {
        await searchIndex.indexEpisode(ep);
      })
    );
  });

  it('should index movie', async () => {
    const [ movie ] = await Movie.findAll();
    await searchIndex.indexMovie(movie); 
  });

  it('should index files', async () => {
    const files = await File.findAll();

    await Promise.all(
      files.map(async (file) => {
        await searchIndex.indexFile(file);
      })
    );
  });

  it.only('should search', async () => {
    console.log((await searchIndex.search('movie: Birdman')).hits);
  });
});