const updater = require('../../src/updater/updater.js');
const assert = require('assert');
const moviesData = require('../assets/movie_expected.json');
const tvData = require('../assets/tv_expected.json');

/**
 * Destroy all entities and chain all promises to avoir deadlock
 */
function destroyAll(data) {
  if (Array.isArray(data)) {
    return data.reduce(async (promise, entity) => {
      await promise;
      return destroyAll(entity);
    }, Promise.resolve());
  } else {
    return data.destroy();
  }
}

describe('Updater', function() {
  this.timeout(60000);

  it('should handle basic priorities', async () => {
    const results = await updater(
      {
        seasons: {
          '123': { id: 123, tv_id: 517, name: 'test updater' }
        },
        tv: {
          '517': { id: 517, name: 'test tv' }
        }
      },
      {
        seasons: {
          entity: 'Season',
          priority: 2
        },
        tv: {
          entity: 'Tv',
          priority: 1
        }
      }
    );
    
    return destroyAll(results);
  });

  it('should handle many to many creation', async () => {
    const videoId = '58f5e92492514127c700b0dd';
    const results = await updater(
      {
        video: {
          [videoId]: { id: videoId, name: 'test video' }
        },
        tv: {
          '517': { 
            id: 517, 
            name: 'test tv',
            videos: [ videoId ] 
          }
        }
      },
      {
        video: {
          entity: 'Video',
          priority: 1
        },
        tv: {
          entity: 'Tv',
          priority: 2,
          relationColumn: 'tv_id',
          relations: {
            videos: {
              entity: 'TvVideo',
              column: 'video_id'
            }
          }
        }
      }
    );

    const tv = results[1][0];
    const tvVideos = await tv.getVideos();

    assert.ok(tvVideos.length && tvVideos[0].id === videoId, 'Invalid video');
    
    return destroyAll(results);
  });

  it('should handle n:m creation', async () => {
    const personId = 12791;
    const castId = '52595bb619c295731c0877cb';
    const tvId = 517;
    const results = await updater(
      {
        persons: {
          [personId]: {
            id: personId,
            name: 'Hugh Dancy',
            profile_path: '/ivFvPpua1zl3GIs7A2Px7QKric5.jpg'
          },
        },
        cast: {
          [castId]: {
            id: castId,
            character: 'Will Graham',
            order: 0,
            person_id: '12791',
            person: '12791'
          },
        },
        tv: {
          [tvId]: { 
            id: tvId, 
            name: 'test tv',
            credits: {
              cast: [ '52595bb619c295731c0877cb' ]
            } 
          }
        }
      },
      {
        persons: {
          entity: 'Person',
          priority: 1
        },
        tv: {
          entity: 'Tv',
          priority: 2,
          relationColumn: 'tv_id',
          relations: {
            'credits.cast': {
              entity: 'TvCast',
              normalizrEntity: 'cast'
            },
          }
        }
      }
    );

    const tv = results[1][0];
    const tvCast = await tv.getCast();
    const person = await tvCast[0].getPerson();

    assert.ok(tvCast.length && tvCast[0].id === castId, 'Invalid cast');
    assert.ok(person.id === personId, 'Invalid person');

    return destroyAll(results);
  });

  it('should handle movie creation with sample data', async () => {
    const results = await updater(moviesData.entities);
    return destroyAll(results);
  });

  it('should handle tv creation with sample data', async () => {
    const results = await updater(tvData.entities);
    return destroyAll(results);
  });

  it('should handle concurrent tv creation with sample data', async () => {
    const promA = updater(tvData.entities);
    const promB = updater(tvData.entities);
    
    return Promise.all([
      promB.then((results) => destroyAll(results)),
      promA.then((results) => destroyAll(results))
    ]);
  });
});