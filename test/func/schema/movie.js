/*global describe,it*/
const onLoaded = require('../../../server.js');
const models = require('../../../src/models/index.js');

describe('Movie schema', () => {
  const { Movie, Genre } = models;

  before(() => {
    return onLoaded;
  });

  afterEach(async () => {
    await Movie.destroy({ cascade: true, where: { id: { $gte: 0 } } });
    await Genre.destroy({ cascade: true, where: { id: { $gte: 0 } } });
  });
  
  it.only('should create genre assoc', async () => {
    const [ movie, genre ] = await Promise.all([
      Movie.create({ title: 'test' }),
      Genre.create({ name: 'yolo' })
    ]);
    
    await movie.addGenre(genre);
  });
});