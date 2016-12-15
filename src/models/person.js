const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const PersonSchema = new Schema({
  externalIds: Schema.Types.Mixed,
  profilePath: String,
  birthday: Date,
  deathday: Date,
  gender: Number,
  name: String,
  biography: String
});

module.exports = mongoose.model('Person', PersonSchema);