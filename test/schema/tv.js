const onLoaded = require('../../server.js');
const models = require('../../src/models/index.js');
const assert = require('assert');

describe('Tv schema', () => {
  const { 
    Tv, Genre, Video, Person, TvCast, TvCrew, 
    Image, Keyword, Season
  } = models;

  before(() => {
    return onLoaded;
  });

  afterEach(async () => {
    //no trucate cascade available
    await Tv.destroy({ cascade: true, where: { id: { $gte: 0 } } });
  });
  
  it('should create genre assoc', async () => {
    const [ tv, genre ] = await Promise.all([
      Tv.create({ name: 'test' }),
      Genre.create({ name: 'yolo' })
    ]);
    
    await tv.addGenre(genre);
    await genre.destroy();
  });

  it('should create video assoc', async () => {
    const [ tv, video ] = await Promise.all([
      Tv.create({ name: 'test' }),
      Video.create({ id: '58f5e92492514127c700b0dc', name: 'yolo' })
    ]);
    
    await tv.addVideo(video);
    await video.destroy();
  });

  it('should create a new cast', async () => {
    const [ tv, person ] = await Promise.all([
      Tv.create({ name: 'test' }),
      Person.create({ name: 'Jean Robert' })
    ]);

    const tvCast = await TvCast.create({ 
      id: '53d55cd10e0a262838004811',
      tv_id: tv.id,
      person_id: person.id,
      character: 'Marcel',
      order: 1
    });

    let cast = await tv.getCast();
    assert.strictEqual((await cast[0].getPerson()).id, person.id);
    
    await tvCast.destroy();
    cast = await tv.getCast();
    assert.strictEqual(cast.length, 0, 'cast should be empty');

    await person.destroy();
  });

  it('should create a new crew', async () => {
    const [ tv, person ] = await Promise.all([
      Tv.create({ name: 'test' }),
      Person.create({ name: 'Jean Robert' })
    ]);

    const tvCrew = await TvCrew.create({ 
      id: '584563e1c3a3684903001915',
      tv_id: tv.id,
      person_id: person.id,
      department: 'Production',
      job: 'Executive Producer'
    });

    let crew = await tv.getCrew();
    assert.strictEqual((await crew[0].getPerson()).id, person.id);
    
    await tvCrew.destroy();
    crew = await tv.getCast();
    assert.strictEqual(crew.length, 0, 'cast should be empty');

    await person.destroy();
  });

  it('should create image backdrop assoc', async () => {
    const [ tv, image ] = await Promise.all([
      Tv.create({ name: 'test' }),
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
    
    await tv.addBackdrop(image);
    await image.destroy();
  });

  it('should create image poster assoc', async () => {
    const [ tv, image ] = await Promise.all([
      Tv.create({ name: 'test' }),
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
    
    await tv.addPoster(image);
    await image.destroy();
  });

  it('should create keyword assoc', async () => {
    const [ tv, keyword ] = await Promise.all([
      Tv.create({ name: 'test' }),
      Keyword.create({ name: 'test'})
    ]);
    
    await tv.addKeyword(keyword);
    await keyword.destroy();
  });

  it('should create a new season', async () => {
    const tv = await Tv.create({ name: 'test' });
    const season = await Season.create({ tv_id: tv.id, name: 'test' });

    let seasons = await tv.getSeasons();
    assert.strictEqual(seasons[0].id, season.id);
    
    await season.destroy();
    seasons = await season.getCast();
    assert.strictEqual(seasons.length, 0, 'seasons should be empty');
  });

  it('custom getter / setter should works', async () => {
    const externalIds = {
      imgdb_id: 'test'
    };
    const episodeRunTime = [ 50, 60, 70, 80 ];
    const networks = [
      { name: 'Net 1' },
      { name: 'Net 2' },
      { name: 'Net 3' } 
    ];
    const originCountry = [ 'US', 'FR', 'CA' ];

    const tv = await Tv.create({ 
      external_ids: externalIds,
      episode_run_time: episodeRunTime,
      networks: networks,
      origin_country: originCountry,
      name: 'test' 
    });
    
    assert.deepStrictEqual(tv.external_ids,     externalIds,    'invalid externalIds');
    assert.deepStrictEqual(tv.episode_run_time, episodeRunTime, 'invalid episodeRunTime');
    assert.deepStrictEqual(tv.networks,         networks,       'invalid networks');
    assert.deepStrictEqual(tv.origin_country,   originCountry,  'invalid originCountry');
  }); 
});