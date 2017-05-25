const extract = require('../../src/services/extractFromQuery.js');
const assert = require('assert');

describe('ExtractQueries', () => {
  it('explode should segment string an remove empty query', () => {
    const result = extract.explode('this is a normal str episode: 2 serie : qwert yop movie: moviyop genre:');
    assert.deepStrictEqual(result, [
      { name: 'serie', query: 'qwert yop' },
      { name: 'movie', query: 'moviyop' },
      { name: 'all', query: 'this is a normal str episode: 2' }
    ]);
  });

  it('should extract tv numbers', () => {
    const result = extract.tvNumbers('test S01E03');
    assert.deepStrictEqual(result, { 
      query: 'test',
      season_number: 1,
      episode_number: 3 
    });
  });

  it('should keep only last tv numbers', () => {
    const result = extract.tvNumbers('s01e05 lalal s02e08');
    assert.deepStrictEqual(result, { 
      query: 'lalal',
      season_number: 2,
      episode_number: 8 
    });
  });

  it('should ignore season or ep number preceded by alpha char', () => {
    const result = extract.tvNumbers('oss117 patrice56');
    assert.deepStrictEqual(result, { 
      query: 'oss117 patrice56'
    });
  });

  it('should retreive episode number', () => {
    const result = extract.tvNumbers('e08 Hannibal');
    assert.deepStrictEqual(result, { 
      query: 'Hannibal',
      episode_number: 8
    });
  });

  it('should retreive season number', () => {
    const result = extract.tvNumbers('s08 Hannibal');
    assert.deepStrictEqual(result, { 
      query: 'Hannibal',
      season_number: 8
    });
  });

  it('should explode and add ep & season numbers', () => {
    const result = extract('serie: Hannibal s08e04');
    assert.deepStrictEqual(result, [ 
      { 
        name: 'serie',
        query: 'Hannibal',
        season_number: 8,
        episode_number: 4 
      } 
    ]);
  });
});