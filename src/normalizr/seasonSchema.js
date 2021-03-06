const sharedSchema = require('./sharedSchema.js');
const { schema } = require('normalizr');
const episodeSchema = require('./episodeSchema.js');

module.exports = new schema.Entity('seasons', {
  credits: {
    crew: [ sharedSchema.crew ],
    cast: [ sharedSchema.cast ]
  },
  images: {
    backdrops: [ sharedSchema.image ],
    posters: [ sharedSchema.image ]
  },
  videos: [ sharedSchema.video ],
  episodes: [ episodeSchema ]
}, {
  processStrategy: (val, parent) => Object.assign({
    tv_id: parent.id
  }, val)
});