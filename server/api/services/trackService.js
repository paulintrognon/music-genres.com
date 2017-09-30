'use strict';

const musicPlayerService = require('./trackPlayerService');
const musicGenreManager = require('../managers/musicGenreManager');
const trackManager = require('../managers/trackManager');

module.exports = createService();

function createService() {
  const service = {};

  service.addToGenre = addToGenre;

  return service;

  // ------------------------------------------------------

  function addToGenre(data) {
    const musicGenreId = data.musicGenreId;
    const trackUrl = data.track.url;
    const trackService = musicPlayerService.parseTrackUrl(trackUrl);
    const trackToCreate = {
      serviceName: trackService.name,
      serviceTrackId: trackService.trackId,
    };

    return musicGenreManager.getOrFail(musicGenreId)
      .then(musicGenre => {
        return trackManager.verifyIfTrackDoesNotAlreadyExistsInGenre(trackToCreate, musicGenre)
          .return(musicGenre);
      })
      .then(musicGenre => trackManager.create(trackToCreate, musicGenre));
  }
}
