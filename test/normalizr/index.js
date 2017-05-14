/*global describe,it*/
const assert = require('assert');
const movieNormalizer = require('../../src/normalizr/movie.js');
const movieData = require('./movie.json');
const movieResultExpected = require('../assets/movie_expected.json');

const tvNormalizer = require('../../src/normalizr/tv.js');
const tvData = require('./tv.json');
const tvResultExpected = require('../assets/tv_expected.json');


describe('Normalizr', () => {
  it('should normalize movie', () => {
    const data = movieNormalizer(movieData);
    assert.deepStrictEqual(data, movieResultExpected);
  });

  it('should normalize tv', () => {
    const data = tvNormalizer(tvData);
    assert.deepStrictEqual(data, tvResultExpected);
  });
});