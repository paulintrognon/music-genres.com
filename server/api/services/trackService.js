'use strict';

const bluebird = require('bluebird');

const musicPlayerService = require('./trackPlayerService');
const musicGenreManager = require('../managers/musicGenreManager');
const trackManager = require('../managers/trackManager');
const Track = require('../../db/models/Track');

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
      playerName: trackService.name,
      playerTrackId: trackService.trackId,
    };

    return bluebird.props({
      musicGenre: verifyIfCanAddTrackToGenre(trackToCreate, musicGenreId),
      track: Track.findOne({ where: trackToCreate }),
    })
      .then(res => {
        if (res.track) {
          return res.musicGenre.addTrack(res.track).return(res.track);
        }
        return musicPlayerService.getTrackPropertiesFromPlayer(trackToCreate)
          .then(trackDataFromPlayer => {
            trackToCreate.title = trackDataFromPlayer.title;
            trackToCreate.description = trackDataFromPlayer.description;
            return trackManager.create(trackToCreate, res.musicGenre);
          });
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
