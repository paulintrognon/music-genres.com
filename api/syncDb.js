'use strict';

const bluebird = require('bluebird');
const db = require('./db.js');
const logger = require('./logger.js');

db.connect()
  .then(() => {
    const MusicGenre = require('./models/MusicGenre.js');
    const Track = require('./models/Track.js');

    return bluebird.props({
      musicGenre: MusicGenre.sync({ alter: true }),
      track: Track.sync({ alter: true }),
    });
  })
  .then(res => {
    logger.info('done');
    logger.debug(res);
  }, err => {
    logger.error(JSON.stringify(err));
    logger.error(err);
  });
