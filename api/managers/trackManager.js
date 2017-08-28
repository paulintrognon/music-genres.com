'use strict';

const bluebird = require('bluebird');

const Track = require('../models/Track.js');
const Vote = require('../models/Vote.js');

module.exports = createManager();

function createManager() {
  const manager = {};

  manager.create = create;
  manager.upvote = upvote;

  return manager;

  // ------------------------------------------------------

  function create(data) {
    const musicGenre = data.musicGenre;
    const trackData = data.track;
    return Track.create({
      url: trackData.url,
    })
      .then(track => musicGenre.addTrack(track).return(track));
  }

  function upvote(data) {
    const trackId = data.trackId;
    const userHash = data.userHash;

    return bluebird.props({
      vote: Vote.findOne({ where: { userHash } }),
      track: Track.findById(trackId),
    })
      .then(res => {
        if (!res.track) {
          throw new Error('track-not-found');
        }
        if (res.vote) {
          throw new Error('already-voted');
        }

        return bluebird.props({
          registerVote: registerVote(res.track, userHash),
          incrementVoteCount: incrementVoteCount(res.track),
        });
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
