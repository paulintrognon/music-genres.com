'use strict';

const trackService = require('../services/trackService');
const trackManager = require('../managers/trackManager');

const userService = require('../services/user');

module.exports = createController();

function createController() {
  const controller = {};

  controller.addTrack = addTrack;
  controller.getRandomTrack = getRandomTrack;
  controller.upvoteTrack = upvoteTrack;
  controller.downvoteTrack = downvoteTrack;

  return controller;

  // ------------------------------------------------------

  function addTrack(req) {
    const musicGenreId = req.body.musicGenreId;
    const track = {
      url: req.body.url,
    };

    return trackService.addToGenre({
      musicGenreId,
      track,
    });
  }

  function getRandomTrack() {
    return trackManager.random();
  }

  function upvoteTrack(req) {
    const userHash = userService.getUserHashFromRequest(req);
    const trackId = req.body.trackId;
    const musicGenreId = req.body.musicGenreId;
    return trackManager.upvote({
      userHash,
      trackId,
      musicGenreId,
    });
  }

  function downvoteTrack(req) {
    const userHash = userService.getUserHashFromRequest(req);
    const trackId = req.body.trackId;
    const musicGenreId = req.body.musicGenreId;
    return trackManager.downvote({
      userHash,
      trackId,
      musicGenreId,
    });
  }
}
