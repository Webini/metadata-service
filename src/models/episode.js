const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const EpisodeSchema = new Schema({
  airDate: Date,
  episodeNumber: Number,
  externalIds: Schema.Types.Mixed,
  name: String,
  overview: String,
  voteAverage: Number,
  videos: Schema.Types.Mixed,
  cast: [
    {
      character: String,
      order: Number,
      personId: { type: Schema.Types.ObjectId, ref: 'Person' }
    }
  ]
});

module.exports = mongoose.model('Episode', EpisodeSchema);