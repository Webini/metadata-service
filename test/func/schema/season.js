/*global describe,it*/
const onLoaded = require('../../../server.js');
const models = require('../../../src/models/index.js');
const assert = require('assert');

describe('Season schema', () => {
  const { 
    Season, Video, Person, SeasonCast, 
    SeasonCrew, Image
  } = models;

  before(() => {
    return onLoaded;
  });

  afterEach(async () => {
    //no trucate cascade available
    await Season.destroy({ cascade: true, where: { id: { $gte: 0 } } });
  });

  it('should create video assoc', async () => {
    const [ season, video ] = await Promise.all([
      Season.create({ title: 'test' }),
      Video.create({ id: '58f5e92492514127c700b0dc', name: 'yolo' })
    ]);
    
    await season.addVideo(video);
    await video.destroy();
  });

  it('should create a new cast', async () => {
    const [ season, person ] = await Promise.all([
      Season.create({ title: 'test' }),
      Person.create({ name: 'Jean Robert' })
    ]);

    const seasonCast = await SeasonCast.create({ 
      id: '53d55cd10e0a262838004811',
      season_id: season.id,
      person_id: person.id,
      character: 'Marcel',
      order: 1
    });

    let cast = await season.getCast();
    assert.strictEqual((await cast[0].getPerson()).id, person.id);
    
    await seasonCast.destroy();
    cast = await season.getCast();
    assert.strictEqual(cast.length, 0, 'cast should be empty');

    await person.destroy();
  });

  it('should create a new crew', async () => {
    const [ season, person ] = await Promise.all([
      Season.create({ title: 'test' }),
      Person.create({ name: 'Jean Robert' })
    ]);

    const seasonCrew = await SeasonCrew.create({ 
      id: '584563e1c3a3684903001915',
      season_id: season.id,
      person_id: person.id,
      department: 'Production',
      job: 'Executive Producer'
    });

    let crew = await season.getCrew();
    assert.strictEqual((await crew[0].getPerson()).id, person.id);
    
    await seasonCrew.destroy();
    crew = await season.getCast();
    assert.strictEqual(crew.length, 0, 'cast should be empty');

    await person.destroy();
  });

  it('should create image backdrop assoc', async () => {
    const [ season, image ] = await Promise.all([
      Season.create({ title: 'test' }),
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
    
    await season.addBackdrop(image);
    await image.destroy();
  });

  it('should create image poster assoc', async () => {
    const [ season, image ] = await Promise.all([
      Season.create({ title: 'test' }),
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
    
    await season.addPoster(image);
    await image.destroy();
  });
});