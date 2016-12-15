const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const GenreSchema = new Schema({
  externalIds: Schema.Types.Mixed,
  name: String,
});

module.exports = mongoose.model('Genre', GenreSchema);