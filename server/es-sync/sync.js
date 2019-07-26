const bluebird = require('bluebird');
const db = require('../db/db');
const es = require('../es/es');

bluebird
  .props({
    db: db.connect(),
    es: es.connect(),
  })
  .then(() => {
    const importMusicGenres = require('./import/music-genres');
    return importMusicGenres();
  });
