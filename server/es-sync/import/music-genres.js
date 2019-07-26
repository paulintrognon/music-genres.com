const bluebird = require('bluebird');
const MusicGenre = require('../../db/models/MusicGenre');
const es = require('../../es/es');

module.exports = importMusicGenres;

function importMusicGenres() {
  return MusicGenre.findAll().then(musicGenres =>
    bluebird.map(musicGenres, importMusicGenre)
  );
}

function importMusicGenre(musicGenre) {
  return es.client.create({
    index: 'music-genres',
    type: 'music-genre',
    id: musicGenre.id,
    body: {
      name: musicGenre.name,
    },
  });
}
