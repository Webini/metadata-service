/*global describe,it*/
const onLoaded = require('../../../server.js');
const models = require('../../../src/models/index.js');
const assert = require('assert');

describe('Episode schema', () => {
  const { 
    EpisodeGuestStar, Episode, Person
  } = models;

  before(() => {
    return onLoaded;
  });

  afterEach(async () => {
    //no trucate cascade available
    await Episode.destroy({ cascade: true, where: { id: { $gte: 0 } } });
  });
  
  it('should create a new guest star', async () => {
    const [ episode, person ] = await Promise.all([
      Episode.create({ name: 'test' }),
      Person.create({ name: 'Jean Robert' })
    ]);

    const episodeGuestStar = await EpisodeGuestStar.create({ 
      id: '5780c2ebc3a368659f000164',
      episode_id: episode.id,
      person_id: person.id,
      character: 'Wendy Vega',
      order: 22
    });

    let stars = await episode.getGuestStars();
    assert.strictEqual((await stars[0].getPerson()).id, person.id);
    
    await episodeGuestStar.destroy();
    stars = await episode.getGuestStars();
    assert.strictEqual(stars.length, 0, 'stars should be empty');

    await person.destroy();
  });
});