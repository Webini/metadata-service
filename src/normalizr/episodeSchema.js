const sharedSchema = require('./sharedSchema.js');
const { schema } = require('normalizr');

module.exports = new schema.Entity('episodes', {
  crew: [ sharedSchema.crew ],
  guest_stars: [ sharedSchema.cast ]
}, {
  processStrategy: (val, parent) => Object.assign({
    season_id: parent.id
  }, val)
});