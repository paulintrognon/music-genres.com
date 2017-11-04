'use strict';

const _ = require('lodash');
const bluebird = require('bluebird');
const Sequelize = require('sequelize');

const MusicGenre = require('../../db/models/MusicGenre');
const Track = require('../../db/models/Track');
const MusicGenreTrack = require('../../db/models/MusicGenreTrack');
const Vote = require('../../db/models/Vote');

module.exports = createManager();

function createManager() {
  const manager = {};

  manager.create = create;
  manager.random = random;
  manager.upvote = upvote;
  manager.downvote = downvote;
  manager.hasUserUpvotedTheTrack = hasUserUpvotedTheTrack;
  manager.formatWithUpvotes = formatWithUpvotes;
  manager.verifyIfTrackDoesNotAlreadyExistsInGenre = verifyIfTrackDoesNotAlreadyExistsInGenre;

  return manager;

  // ------------------------------------------------------

  function create(trackToAdd, musicGenre) {
    return Track.create(trackToAdd)
      .then(track => musicGenre.addTrack(track).return(track));
  }

  // ------------------------------------------------------

  function hasUserUpvotedTheTrack(trackId, userHash) {
    return Vote.count({ where: {
      trackId,
      userHash,
    } })
      .then(count => count > 0);
  }

  // ------------------------------------------------------

  function formatWithUpvotes(tracks) {
    return tracks.sort((a, b) => {
      return b.musicGenreTrack.upvotes - a.musicGenreTrack.upvotes;
    }).map(musicGenre => {
      musicGenre.upvotes = musicGenre.musicGenreTrack.upvotes;
      return _.omit(musicGenre, 'musicGenreTrack');
    });
  }

  // ------------------------------------------------------

  function verifyIfTrackDoesNotAlreadyExistsInGenre(trackToCreate, musicGenre) {
    return Track.findOne({
      attributes: ['id'],
      where: {
        playerName: trackToCreate.playerName,
        playerTrackId: trackToCreate.playerTrackId,
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
          payload: {
            trackToCreate,
            musicGenre: musicGenre.get({ plain: true }),
          },
        });
      });
  }

  // ------------------------------------------------------

  function random() {
    return Track.find({
      attributes: ['id', 'playerName', 'playerTrackId'],
      order: [
        Sequelize.fn('RAND'),
      ],
      include: {
        model: MusicGenre,
        attributes: ['id', 'name', 'slug'],
      },
    })
      .then(res => res.get({ plain: true }));
  }

  // ------------------------------------------------------

  function upvote(data) {
    const trackId = data.trackId;
    const musicGenreId = data.musicGenreId;
    const userHash = data.userHash;

    return bluebird.props({
      vote: Vote.findOne({ where: { userHash, trackId, musicGenreId } }),
      track: Track.findById(trackId, { attributes: ['id'] }),
      musicGenre: MusicGenre.findById(musicGenreId, { attributes: ['id'] }),
      musicGenreTrack: MusicGenreTrack.findOne({ where: { trackId, musicGenreId } }),
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
        if (!res.musicGenre) {
          return bluebird.reject({
            status: 404,
            code: 'musicGenre-not-found',
            message: 'The musicGenre in which to upvote the track has not been found.',
            payload: { data },
          });
        }
        if (!res.musicGenreTrack) {
          return bluebird.reject({
            status: 404,
            code: 'musicGenreTrack-not-found',
            message: 'The link between the genre and the track has not been found.',
            payload: { data },
          });
        }
        if (res.vote) {
          return bluebird.reject({
            message: 'This client has already voted for that track in that genre',
            code: 'already-voted',
            payload: { data },
          });
        }

        return bluebird.props({
          registerVote: registerVote(res.track, res.musicGenre, userHash),
          incrementVoteCount: incrementVoteCount(res.musicGenreTrack),
        });
      })
      .then(res => {
        return { upvotes: res.incrementVoteCount.upvotes };
      });
  }

  function registerVote(track, musicGenre, userHash) {
    return Vote.create({ userHash })
      .then(vote => track.addVote(vote).return(vote))
      .then(vote => musicGenre.addVote(vote));
  }

  function incrementVoteCount(musicGenreTrack) {
    musicGenreTrack.upvotes += 1;
    return musicGenreTrack.save();
  }

  // ------------------------------------------------------

  function downvote(data) {
    const trackId = data.trackId;
    const musicGenreId = data.musicGenreId;
    const userHash = data.userHash;

    return bluebird.props({
      vote: Vote.findOne({ where: { userHash, trackId, musicGenreId } }),
    })
      .then(res => {
        if (!res.vote) {
          return bluebird.reject({
            message: 'This client has not voted for that track in that genre',
            code: 'vote-not-found',
            payload: { data },
          });
        }

        return res.vote.destroy();
      });
  }
}
