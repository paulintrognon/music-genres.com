'use strict';

const musicGenreManager = require('../managers/musicGenreManager.js');

module.exports = createController();

function createController() {
  const controller = {};

  controller.createMusicGenre = createMusicGenre;
  controller.getWithTracks = getWithTracks;

  return controller;

  // ------------------------------------------------------

  function createMusicGenre(req) {
    return musicGenreManager.create({
      name: req.body.name,
    });
  }

  function getWithTracks(req) {
    return musicGenreManager.getWithTracks(req.params.id);
  }
}
