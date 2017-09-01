'use strict';

const trackManager = require('../managers/trackManager');

const userService = require('../services/user');

module.exports = createController();

function createController() {
  const controller = {};

  controller.addTrack = addTrack;
  controller.getRandomTrack = getRandomTrack;
  controller.upvoteTrack = upvoteTrack;

  return controller;

  // ------------------------------------------------------

  function addTrack(req) {
    const musicGenreId = req.body.musicGenreId;
    const track = {
      url: req.body.url,
    };

    return trackManager.create({
      musicGenreId,
      track,
    });
  }

  function getRandomTrack() {
    return trackManager.random();
  }

  function upvoteTrack(req) {
    const userHash = userService.getUserHashFromRequest(req);
    return trackManager.upvote({
      userHash,
      trackId: req.params.trackId,
    });
  }
}