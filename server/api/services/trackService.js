'use strict';

const bluebird = require('bluebird');

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

    return bluebird.props({
      musicGenre: verifyIfCanAddTrackToGenre(trackToCreate, musicGenreId),
      trackDataFromPlayer: musicPlayerService.getTrackPropertiesFromPlayer(trackToCreate),
    })
      .then(res => {
        trackToCreate.title = res.trackDataFromPlayer.title;
        trackToCreate.description = res.trackDataFromPlayer.description;
        return trackManager.create(trackToCreate, res.musicGenre);
      });
  }

  function verifyIfCanAddTrackToGenre(trackToCreate, musicGenreId) {
    return musicGenreManager.getOrFail(musicGenreId)
      .then(musicGenre => {
        return trackManager.verifyIfTrackDoesNotAlreadyExistsInGenre(trackToCreate, musicGenre)
          .return(musicGenre);
      });
  }
}
