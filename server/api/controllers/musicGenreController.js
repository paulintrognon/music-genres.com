'use strict';

const _ = require('lodash');
const musicGenreManager = require('../managers/musicGenreManager');

module.exports = createController();

function createController() {
  const controller = {};

  controller.createMusicGenre = createMusicGenre;
  controller.getWithTracks = getWithTracks;
  controller.search = search;

  return controller;

  // ------------------------------------------------------

  function createMusicGenre(req) {
    const parentId = req.body.parentId ? _.castArray(req.body.parentId) : [];
    const parentIds = req.body.parentIds ? _.castArray(req.body.parentIds) : [];

    return musicGenreManager.create({
      name: req.body.name,
      parentIds: _.uniq(parentId.concat(parentIds)).sort(),
    });
  }

  function getWithTracks(req) {
    return musicGenreManager.getWithTracks(req.params.id);
  }

  function search(req) {
    return musicGenreManager.search(req.query.query, parseInt(req.query.limit, 10));
  }
}
