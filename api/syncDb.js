'use strict';

const db = require('./db.js');
const logger = require('./logger.js');

db.connect()
  .then(() => {
    const MusicGenre = require('./models/MusicGenre.js');
    const Track = require('./models/Track.js');
    const Vote = require('./models/Vote.js');

    return MusicGenre.sync({ alter: true })
      .then(() => Track.sync({ alter: true }))
      .then(() => Vote.sync({ alter: true }));
  })
  .then(res => {
    logger.info('done');
    logger.debug(res);
  }, err => {
    logger.error(JSON.stringify(err));
    logger.error(err);
  });
