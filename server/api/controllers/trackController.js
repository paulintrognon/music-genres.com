const trackService = require('../services/trackService');
const trackManager = require('../managers/trackManager');
const trackPlayerService = require('../services/trackPlayerService');

const userService = require('../services/user');

module.exports = createController();

function createController() {
  const controller = {};

  controller.addTrack = addTrack;
  controller.getRandomTrack = getRandomTrack;
  controller.upvoteTrack = upvoteTrack;
  controller.downvoteTrack = downvoteTrack;
  controller.parseTrackUrl = parseTrackUrl;

  return controller;

  // ------------------------------------------------------

  function addTrack(req) {
    const { musicGenreId } = req.body;
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
    const { trackId, musicGenreId } = req.body;
    return trackManager.upvote({
      userHash,
      trackId,
      musicGenreId,
    });
  }

  function downvoteTrack(req) {
    const userHash = userService.getUserHashFromRequest(req);
    const { trackId, musicGenreId } = req.body;
    return trackManager.downvote({
      userHash,
      trackId,
      musicGenreId,
    });
  }

  function parseTrackUrl(req) {
    return trackPlayerService.extractTrackPropertiesFromUrl(req.body.trackUrl);
  }
}
