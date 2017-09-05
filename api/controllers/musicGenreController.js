'use strict';

const _ = require('lodash');
const musicGenreManager = require('../managers/musicGenreManager');

module.exports = createController();

function createController() {
  const controller = {};

  controller.createMusicGenre = createMusicGenre;
  controller.getWithTracks = getWithTracks;

  return controller;

  // ------------------------------------------------------

  function createMusicGenre(req) {
    const parentIds = req.body.parentIds || [];
    if (req.body.parentId) {
      parentIds.push(req.body.parentId);
    }
    return musicGenreManager.create({
      name: req.body.name,
      parentIds: _.uniq(parentIds),
    });
  }

  function getWithTracks(req) {
    return musicGenreManager.getWithTracks(req.params.id);
  }
}
