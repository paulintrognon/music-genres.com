'use strict';

const musicGenreManager = require('../managers/musicGenreManager');
const trackManager = require('../managers/trackManager');

const userService = require('../services/user');

module.exports = createController();

function createController() {
  const controller = {};

  controller.addTrack = addTrack;
  controller.upvoteTrack = upvoteTrack;

  return controller;

  // ------------------------------------------------------

  function addTrack(req) {
    const musicGenreId = req.body.musicGenreId;
    const track = {
      url: req.body.url,
    };

    return musicGenreManager.get(musicGenreId)
      .then(musicGenre => {
        if (!musicGenre) {
          return { notFound: true };
        }
        return trackManager.create({
          musicGenre,
          track,
        });
      });
  }

  function upvoteTrack(req) {
    const userHash = userService.getUserHashFromRequest(req);
    return trackManager.upvote({
      userHash,
      trackId: req.params.trackId,
    });
  }
}
