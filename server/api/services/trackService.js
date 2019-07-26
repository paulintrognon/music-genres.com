const bluebird = require('bluebird');

const trackPlayerService = require('./trackPlayerService');
const musicGenreManager = require('../managers/musicGenreManager');
const trackManager = require('../managers/trackManager');

module.exports = {
  addToGenre,
  checkIfUserHasUpvotedTheTracks,
};

async function addToGenre(data) {
  const { musicGenreId } = data;
  const trackUrl = data.track.url;
  const trackToCreate = trackPlayerService.parseTrackUrl(trackUrl);

  const { musicGenre, track } = await bluebird.props({
    musicGenre: verifyIfCanAddTrackToGenre(trackToCreate, musicGenreId),
    track: trackManager.getFromPlayerTrackData(trackToCreate),
  });

  // If the track already exists, we just attach the new genre to the track
  if (track) {
    return musicGenre.addTrack(track).return({
      track,
      musicGenre,
    });
  }

  // If the track does not exist yet, we create it
  const trackDataFromPlayer = await trackPlayerService.getTrackPropertiesFromPlayer(
    trackToCreate
  );
  trackToCreate.title = trackDataFromPlayer.title;
  trackToCreate.description = trackDataFromPlayer.description;
  const newCreatedTrack = await trackManager.create(trackToCreate, musicGenre);

  return {
    track: newCreatedTrack,
    musicGenre,
  };
}

async function verifyIfCanAddTrackToGenre(trackToCreate, musicGenreId) {
  const musicGenre = await musicGenreManager.getOrFail(musicGenreId);
  await trackManager.verifyIfTrackDoesNotAlreadyExistsInGenre(
    trackToCreate,
    musicGenre
  );
  return musicGenre;
}

// ------------------------------------------------------

async function checkIfUserHasUpvotedTheTracks(tracks, userHash) {
  return bluebird.map(tracks, async track => {
    const hasUpvoted = await trackManager.hasUserUpvotedTheTrack(
      track.id,
      userHash
    );
    return {
      ...track,
      hasUpvoted,
    };
  });
}
