'use strict';

const MusicGenre = require('../models/MusicGenre.js');

module.exports = createController();

function createController() {
  const controller = {};

  controller.createMusicGenre = createMusicGenre;

  return controller;

  // ------------------------------------------------------

  function createMusicGenre(req) {
    return MusicGenre.create({
      name: req.body.name,
    });
  }
}
