'use strict';

const MusicGenre = require('../models/MusicGenre.js');

module.exports = createController();

function createController() {
  const controller = {};

  controller.createMusicGenre = createMusicGenre;

  return controller;

  // ------------------------------------------------------

  function createMusicGenre() {
    return MusicGenre.create({
      name: 'Jazz',
    });
  }
}
