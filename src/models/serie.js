const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const SerieSchema = new Schema({
  backdropPath:  String,
  posterPath: String,
  episodeRunTime: [ Number ],
  externalIds: Schema.Types.Mixed,
  firstAirDate: Date,
  genres: [ { type: Schema.Types.ObjectId, ref: 'Genre' } ],
  homepage: String,
  name: String,
  originalLanguage: String,
  overview: String,
  createdBy: [ { type: Schema.Types.ObjectId, ref: 'Person' } ],
  cast: [
    {
      character: String,
      order: Number,
      personId: { type: Schema.Types.ObjectId, ref: 'Person' }
    } 
  ],
  seasons: [
    {
      posterPath: String,
      airDate: Date,
      episodeCount: Number,
      seasonNumber: Number,
      externalIds: Schema.Types.Mixed,
      overview: String,
      videos: Schema.Types.Mixed,
      episodes: [
        {
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
          ],
        }
      ]
    }
  ],
  videos: Schema.Types.Mixed,
  voteAverage: Number,
  updatedAt: { type: Date, default: Date.now }
});

module.exports = SerieSchema;