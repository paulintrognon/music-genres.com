'use strict';

const bluebird = require('bluebird');
const httpErrors = require('http-errors');
const Sequelize = require('sequelize');

const MusicGenre = require('../models/MusicGenre');
const Track = require('../models/Track');
const Vote = require('../models/Vote');

const musicPlayerService = require('../services/musicPlayer');

module.exports = createManager();

function createManager() {
  const manager = {};

  manager.create = create;
  manager.random = random;
  manager.upvote = upvote;

  return manager;

  // ------------------------------------------------------

  function create(data) {
    const musicGenreId = data.musicGenreId;
    const trackUrl = data.track.url;
    const trackService = musicPlayerService.parseTrackUrl(trackUrl);
    const trackToCreate = {
      serviceName: trackService.name,
      serviceTrackId: trackService.trackId,
    };

    return MusicGenre.findById(musicGenreId)
      .then(musicGenre => {
        if (!musicGenre) {
          throw new httpErrors.NotFound('music-genre-not-found');
        }

        return createTrackIntoMusicGenre(trackToCreate, musicGenre);
      });
  }

  function createTrackIntoMusicGenre(trackToCreate, musicGenre) {
    return Track.findOne({
      attributes: ['id', 'serviceName', 'serviceTrackId'],
      where: {
        serviceName: trackToCreate.serviceName,
        serviceTrackId: trackToCreate.serviceTrackId,
      },
      include: [{
        model: MusicGenre,
        where: { id: musicGenre.id },
        attributes: ['id', 'name', 'slug'],
      }],
    })
      .then(track => {
        if (!track) {
          return Track.create(trackToCreate);
        }
        return bluebird.reject({
          message: `Track already listed in "${musicGenre.name}"`,
          code: 'track-already-listed',
          payload: { track },
        });
      })
      .then(track => musicGenre.addTrack(track).return(track));
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
          throw new httpErrors.NotFound('track-not-found');
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
