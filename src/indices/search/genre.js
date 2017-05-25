async function normalize(genres) {
  return genres.map((genre) => {
    return {
      name: genre.name,
      id: genre.id
    };
  });
}

module.exports = {
  normalize,
  properties: {
    name: { type: 'text' }
  }
};