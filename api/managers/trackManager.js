'use strict';

const Track = require('../models/Track.js');

module.exports = createManager();

function createManager() {
  const manager = {};

  manager.create = create;

  return manager;

  // ------------------------------------------------------

  function create(data) {
    const musicGenre = data.musicGenre;
    const trackData = data.track;
    return Track.create({
      url: trackData.url,
    })
      .then(track => musicGenre.addTrack(track).return(track));
  }
}
