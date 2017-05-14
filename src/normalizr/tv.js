const normalizr = require('normalizr');
const schema = normalizr.schema;
const normalize = normalizr.normalize;
const sharedSchema = require('./sharedSchema.js');
const seasonSchema = require('./seasonSchema.js');

const tv = new schema.Entity('tv', { 
  genres: [ sharedSchema.genre ],
  videos: [ sharedSchema.video ],
  credits: {
    crew: [ sharedSchema.crew ],
    cast: [ sharedSchema.cast ]
  },
  images: {
    backdrops: [ sharedSchema.image ],
    posters: [ sharedSchema.image ]
  },
  keywords: [ sharedSchema.keyword ],
  seasons: [ seasonSchema ]
});

module.exports = (data) => {
  return normalize(data, tv);
};