'use strict';

const musicGenreManager = require('../managers/musicGenreManager.js');
const trackManager = require('../managers/trackManager.js');

module.exports = createController();

function createController() {
  const controller = {};

  controller.addTrack = addTrack;

  return controller;

  // ------------------------------------------------------

  function addTrack(req) {
    const musicGenreId = req.body.musicGenreId;
    return musicGenreManager.get(musicGenreId)
      .then(() => 'lol');
  }
}
