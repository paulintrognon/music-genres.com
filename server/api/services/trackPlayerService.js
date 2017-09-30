'use strict';

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

  service.getTrackPropertiesFromPlayer = getTrackPropertiesFromPlayer;
  service.parseTrackUrl = parseTrackUrl;

  return service;

  // ------------------------------------------------------

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
      trackId,
      name: 'youtube',
    };
  }
}
