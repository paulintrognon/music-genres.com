'use strict';

const _ = require('lodash');
const bluebird = require('bluebird');
const Sequelize = require('sequelize');

const MusicGenre = require('../../db/models/MusicGenre');
const Track = require('../../db/models/Track');
const Vote = require('../../db/models/Vote');

module.exports = createManager();

function createManager() {
  const manager = {};

  manager.create = create;
  manager.random = random;
  manager.upvote = upvote;
  manager.verifyIfTrackDoesNotAlreadyExistsInGenre = verifyIfTrackDoesNotAlreadyExistsInGenre;

  return manager;

  // ------------------------------------------------------

  function create(trackToAdd, musicGenre) {
    return Track.create(trackToAdd)
      .then(track => musicGenre.addTrack(track).return(track));
  }

  // ------------------------------------------------------

  function verifyIfTrackDoesNotAlreadyExistsInGenre(track, musicGenre) {
    return Track.findOne({
      attributes: ['id', 'serviceName', 'serviceTrackId'],
      where: {
        serviceName: track.serviceName,
        serviceTrackId: track.serviceTrackId,
      },
      include: [{
        model: MusicGenre,
        where: { id: musicGenre.id },
        attributes: ['id', 'name', 'slug'],
      }],
    })
      .then(track => {
        if (!track) {
          return musicGenre;
        }
        return bluebird.reject({
          message: `Track already listed in "${musicGenre.name}"`,
          code: 'track-already-listed',
          payload: { track },
        });
      });
  }

  // ------------------------------------------------------

  function random() {
    return Track.find({
      attributes: ['id', 'serviceName', 'serviceTrackId', 'upvotes'],
      order: [
        Sequelize.fn('RAND'),
      ],
      include: {
        model: MusicGenre,
        attributes: ['id', 'name', 'slug'],
      },
    })
      .then(res => {
        const track = res.toJSON();
        track.musicGenre = track.music_genre;
        delete track.music_genre;
        return track;
      });
  }

  // ------------------------------------------------------

  function upvote(data) {
    const trackId = data.trackId;
    const userHash = data.userHash;

    return bluebird.props({
      vote: Vote.findOne({ where: { userHash, trackId } }),
      track: Track.findById(trackId, { attributes: ['id', 'upvotes'] }),
    })
      .then(res => {
        if (!res.track) {
          return bluebird.reject({
            status: 404,
            code: 'track-not-found',
            message: 'The track to upvote has not been found.',
            payload: { data },
          });
        }
        if (res.vote) {
          return bluebird.reject({
            message: 'This client has already voted for that track',
            code: 'already-voted',
            payload: { track: res.track },
          });
        }

        return bluebird.props({
          registerVote: registerVote(res.track, userHash),
          incrementVoteCount: incrementVoteCount(res.track),
        });
      })
      .then(res => {
        return { upvotes: res.incrementVoteCount.upvotes };
      });
  }

  function registerVote(track, userHash) {
    return Vote.create({ userHash })
      .then(vote => track.addVote(vote));
  }

  function incrementVoteCount(track) {
    track.upvotes += 1;
    return track.save();
  }
}
