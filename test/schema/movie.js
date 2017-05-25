const models  = require('../../src/models/index.js');
const assert  = require('assert');
const emptyDb = require('../tools/emptyDb.js');

describe('Movie schema', () => {
  const { 
    Movie, Genre, ProductionCompany, Video,
    Person, MovieCast, MovieCrew, Image, Keyword
  } = models;

  after(emptyDb);

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

  it('should create a new cast', async () => {
    const [ movie, person ] = await Promise.all([
      Movie.create({ title: 'test' }),
      Person.create({ name: 'Jean Robert' })
    ]);

    const movieCast = await MovieCast.create({ 
      id: '53d55cd10e0a262838004811',
      movie_id: movie.id,
      person_id: person.id,
      character: 'Marcel',
      order: 1
    });

    let cast = await movie.getCast();
    assert.strictEqual((await cast[0].getPerson()).id, person.id);
    
    await movieCast.destroy();
    cast = await movie.getCast();
    assert.strictEqual(cast.length, 0, 'cast should be empty');

    await person.destroy();
  });

  it('should create a new crew', async () => {
    const [ movie, person ] = await Promise.all([
      Movie.create({ title: 'test' }),
      Person.create({ name: 'Jean Robert' })
    ]);

    const movieCrew = await MovieCrew.create({ 
      id: '584563e1c3a3684903001915',
      movie_id: movie.id,
      person_id: person.id,
      department: 'Production',
      job: 'Executive Producer'
    });

    let crew = await movie.getCrew();
    assert.strictEqual((await crew[0].getPerson()).id, person.id);
    
    await movieCrew.destroy();
    crew = await movie.getCast();
    assert.strictEqual(crew.length, 0, 'cast should be empty');

    await person.destroy();
  });

  it('should create image backdrop assoc', async () => {
    const [ movie, image ] = await Promise.all([
      Movie.create({ title: 'test' }),
      Image.create({
        id: 'ecdc19a9ab3c228a79aa636629ef7c65',
        aspect_ratio: 1.777777777777778,
        file_path: '/Ai39EIo1x3gaFM8qLszZADvrR20.jpg',
        height: 1125,
        iso_639_1: 'en',
        vote_average: 5.384,
        vote_count: 2,
        width: 2000
      })
    ]);
    
    await movie.addBackdrop(image);
    await image.destroy();
  });

  it('should create image poster assoc', async () => {
    const [ movie, image ] = await Promise.all([
      Movie.create({ title: 'test' }),
      Image.create({
        id: 'ecdc19a9ab3c228a79aa636629ef7c65',
        aspect_ratio: 1.777777777777778,
        file_path: '/Ai39EIo1x3gaFM8qLszZADvrR20.jpg',
        height: 1125,
        iso_639_1: 'en',
        vote_average: 5.384,
        vote_count: 2,
        width: 2000
      })
    ]);
    
    await movie.addPoster(image);
    await image.destroy();
  });

  it('should create keyword assoc', async () => {
    const [ movie, keyword ] = await Promise.all([
      Movie.create({ title: 'test' }),
      Keyword.create({ name: 'test'})
    ]);
    
    await movie.addKeyword(keyword);
    await keyword.destroy();
  });
});