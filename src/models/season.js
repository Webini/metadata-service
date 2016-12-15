const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const SeasonSchema = new Schema({
  posterPath: String,
  airDate: Date,
  episodeCount: Number,
  seasonNumber: Number,
  externalIds: Schema.Types.Mixed,
  overview: String,
  videos: Schema.Types.Mixed,
  episodes: [ { type: Schema.Types.ObjectId, ref: 'Episode' } ],
});

module.exports = mongoose.model('Season', SeasonSchema);