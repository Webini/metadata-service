/*global describe,it*/
const onLoaded = require('../../../server.js');
const models = require('../../../src/models/index.js');

describe('Movie schema', () => {
  const { Movie, Genre, ProductionCompany, Video } = models;

  before(() => {
    return onLoaded;
  });

  afterEach(async () => {
    //no trucate cascade available
    await Movie.destroy({ cascade: true, where: { id: { $gte: 0 } } });
  });
  
  it('should create genre assoc', async () => {
    const [ movie, genre ] = await Promise.all([
      Movie.create({ title: 'test' }),
      Genre.create({ name: 'yolo' })
    ]);
    
    await movie.addGenre(genre);
    await genre.destroy();
  });

  it('should create production company assoc', async () => {
    const [ movie, pcomp ] = await Promise.all([
      Movie.create({ title: 'test' }),
      ProductionCompany.create({ name: 'yolo' })
    ]);
    
    await movie.addProductionCompany(pcomp);
    await pcomp.destroy();
  });

  it('should create video assoc', async () => {
    const [ movie, video ] = await Promise.all([
      Movie.create({ title: 'test' }),
      Video.create({ id: '58f5e92492514127c700b0dc', name: 'yolo' })
    ]);
    
    await movie.addVideo(video);
    await video.destroy();
  });
});