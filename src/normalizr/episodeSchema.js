const sharedSchema = require('./sharedSchema.js');
const normalizr = require('normalizr');
const schema = normalizr.schema;

module.exports = new schema.Entity('episodes', {
  crew: [ sharedSchema.crew ],
  guest_stars: [ sharedSchema.cast ]
}, {
  processStrategy: (val, parent) => Object.assign({
    tv_id: parent.tv_id,
    season_id: parent.id
  }, val)
});