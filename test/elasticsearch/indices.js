const sequelizeFixtures = require('sequelize-fixtures');
const models = require('../../src/models/index.js');
const es = require('../../src/elastic.js');
const { search: searchIndex } = require('../../src/indices/index.js');
const emptyDb = require('../tools/emptyDb.js');

describe.only('Elasticsearch', () => {
  const { Movie, Tv, File } = models;

  before(async () => {
    await emptyDb();
    //delete and recreate es index
    if (await es.indices.exists({ index: searchIndex.definition.index })) {
      await es.indices.close({ index: searchIndex.definition.index });
      await es.indices.delete({ index: searchIndex.definition.index });
    } 
    await es.indices.create(searchIndex.definition);

    return await sequelizeFixtures.loadFile(`${__dirname}/../assets/search_fixtures.json`, models);
  });

  //after(emptyDb);

  it.only('should index TV', async () => {
    const [ tv ] = await Tv.findAll();
    
    await searchIndex.indexTv(tv);
  });
});