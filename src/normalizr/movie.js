const { schema, normalize } = require('normalizr');
const sharedSchema = require('./sharedSchema.js');

const movie = new schema.Entity('movies', { 
  genres: [ sharedSchema.genre ],
  production_companies: [ sharedSchema.productionCompany ],
  production_countries: [ sharedSchema.country ],
  spoken_languages: [ sharedSchema.language ],
  videos: [ sharedSchema.video ],
  credits: {
    crew: [ sharedSchema.crew ],
    cast: [ sharedSchema.cast ]
  },
  images: {
    backdrops: [ sharedSchema.image ],
    posters: [ sharedSchema.image ]
  },
  keywords: [ sharedSchema.keyword ]
});

module.exports = (data) => {
  return normalize(data, movie);
};