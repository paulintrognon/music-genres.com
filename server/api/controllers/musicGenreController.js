'use strict';

const _ = require('lodash');
const bluebird = require('bluebird');

const musicGenreManager = require('../managers/musicGenreManager');
const userService = require('../services/user');
const trackService = require('../services/trackService');

module.exports = createController();

function createController() {
  const controller = {};

  controller.createMusicGenre = createMusicGenre;
  controller.getAll = getAll;
  controller.getSomeRandom = getSomeRandom;
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

  function getAll() {
    return musicGenreManager.getAll();
  }

  function getSomeRandom(req) {
    const nb = req.params.nb || 3;
    return musicGenreManager.getSomeRandom(nb);
  }

  function getWithTracks(req) {
    return bluebird.props({
      musicGenre: musicGenreManager.getWithTracks(req.params.slug),
      userHash: userService.getUserHashFromRequest(req),
    })
      .then(res => {
        return trackService.checkIfUserHasUpvotedTheTracks(res.musicGenre.tracks, res.userHash)
          .then(tracks => {
            res.musicGenre.tracks = tracks;
            return res.musicGenre;
          });
      });
  }

  function search(req) {
    return musicGenreManager.search(req.query.query, parseInt(req.query.limit, 10));
  }
}
