'use strict';

const musicGenreManager = require('../managers/musicGenreManager.js');

module.exports = createController();

function createController() {
  const controller = {};

  controller.createMusicGenre = createMusicGenre;

  return controller;

  // ------------------------------------------------------

  function createMusicGenre(req) {
    return musicGenreManager.create({
      name: req.body.name,
    });
  }
}
