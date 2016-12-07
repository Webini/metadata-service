const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const MovieSchema = new Schema({
  externalIds: Schema.Types.Mixed,
  adult: Boolean,
  backdropPath:  String,
  posterPath: String,
  budget: Number,
  genres: [ { type: Schema.Types.ObjectId, ref: 'Genre' } ],
  homepage: String,
  originalLanguage: String,
  originalTitle: String,
  title: String,
  overview: String,
  releaseDate: Date,
  runtime: Number,
  tagLine: String,
  voteAverage: Number,
  videos: Schema.Types.Mixed,
  updatedAt: { type: Date, default: Date.now },
  cast: [
    {
      character: String,
      order: Number,
      personId: { type: Schema.Types.ObjectId, ref: 'Person' }
    } 
  ],
  crew: [
    {
      job: String,
      department: String,
      personId: { type: Schema.Types.ObjectId, ref: 'Person' }
    }
  ]
});

module.exports = MovieSchema;