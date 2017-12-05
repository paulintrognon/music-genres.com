'use strict';

const _ = require('lodash');
const bluebird = require('bluebird');

module.exports = createService();

function createService() {
  const service = {
    players: {
      youtube: require('./players/youtube'),
    },
  };
  const detections = [
    {
      detect: /youtube\.com/,
      extract: /\?v=(.{11})/,
      service: 'youtube',
    },
    {
      detect: /youtu\.be/,
      extract: /youtu\.be\/(.{11})/,
      service: 'youtube',
    },
  ];

  service.extractTrackPropertiesFromUrl = extractTrackPropertiesFromUrl;
  service.getTrackPropertiesFromPlayer = getTrackPropertiesFromPlayer;
  service.parseTrackUrl = parseTrackUrl;

  return service;

  // ------------------------------------------------------

  function extractTrackPropertiesFromUrl(url) {
    const track = parseTrackUrl(url);
    if (!track) {
      return bluebird.reject({
        code: 'url-not-recognized',
        message: 'The url has not been recognized. Please make sure it is a valid youtube url.',
      });
    }
    return getTrackPropertiesFromPlayer(track)
      .then(res => _.merge(track, res));
  }

  function getTrackPropertiesFromPlayer(track) {
    return service.players[track.playerName].getTrackPropertiesFromId(track.playerTrackId);
  }

  function parseTrackUrl(url) {
    const detection = detections.find(detectionTested => {
      return url.search(detectionTested.detect) !== -1;
    });
    if (detection) {
      return extractYoutubeId(url, detection.extract);
    }
    return false;
  }

  function extractYoutubeId(url, regex) {
    const matches = url.match(regex);
    const trackId = matches[1];
    return {
      playerName: 'youtube',
      playerTrackId: trackId,
    };
  }
}
