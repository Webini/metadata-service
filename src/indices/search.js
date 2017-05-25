const es = require('../elastic.js');
const extract = require('../services/extractFromQuery.js');
const { properties: fileProperties, index: indexFile } = require('./search/file.js');
const { properties: movieProperties, index: indexMovie } = require('./search/movie.js');
const { properties: tvProperties, index: indexTv } = require('./search/tv.js');
const { properties: seasonProperties, index: indexSeason } = require('./search/season.js');
const { properties: episodeProperties, index: indexEpisode } = require('./search/episode.js');
const indexName = 'search';

function buildQuery(command) {
  const query = {
    bool: {
      filter: [
        {
          range: {
            files_count: {
              gt: 0
            }
          }
        }
      ],
      should: [
        {
          multi_match: {
            query: command.query,
            fields: [
              'name^4', 'original_name', 'overview',  
            ]
          }
        },
        {
          nested: {
            path: 'files',
            ignore_unmapped: true,
            score_mode: 'max',
            query: {
              multi_match: {
                query: command.query,
                fields: [ 'files.name^2', 'files.original_name' ]
              } 
            }
          }
        },
        {
          nested: {
            path: 'genres',
            ignore_unmapped: true,
            score_mode: 'max',
            query: {
              match: {
                'genres.name': command.query
              } 
            }
          }
        },
        {
          nested: {
            path: 'episodes',
            ignore_unmapped: true,
            score_mode: 'max',
            query: {
              match: {
                'episodes.name': command.query
              } 
            }
          }
        }
      ],
      minimum_should_match: 1,
      boost: 1.0
    }
  };

  if (command.name === 'movie') {
    query.bool.filter.push({ terms: { _type: 'movie' } });
  } else if (command.name === 'serie') {
    let types = [ 'tv', 'episode', 'season' ];
    if (command.episode_number) {
      types = 'episode';
    } else if(command.season_number) {
      types = 'season';
    } 
    query.bool.filter.push({ terms: { _type: types } });
  }

  if (command.episode_number) {
    query.bool.filter.push({ term: { episode_number: command.episode_number } });
  }

  if (command.season_number) {
    query.bool.filter.push({ term: { season_number: command.season_number } });
  }
  
  return query;
}

async function search(str, from = 0, size = 5) {
  const commands = extract(str);
  const queries = commands.map(buildQuery);
  
  return es.search({
    index: indexName,
    body: {
      query: {
        bool: {
          should: queries,
          minimum_should_match: 1,
          boost: 1.0
        }
      },
      track_scores: true,
      sort: [
        { _type: 'asc' },
        { _score: 'desc' },
        { updated_at: 'desc' }
      ],
      size,
      from
    }
  });
}

module.exports = {
  definition: {
    index: indexName,
    body: {
      mappings: {
        file: {
          _all: { enabled: false },
          properties: fileProperties
        },
        movie: {
          _all: { enabled: false },
          properties: movieProperties
        },
        episode: {
          _all: { enabled: false },
          properties: episodeProperties
        },
        season: {
          _all: { enabled: false },
          properties: seasonProperties
        },
        tv: {
          _all: { enabled: false },
          properties: tvProperties
        }
      }
    }
  },
  search,
  indexFile,
  indexMovie,
  indexEpisode,
  indexSeason,
  indexTv
};