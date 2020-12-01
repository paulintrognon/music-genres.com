const _ = require('lodash')
const bluebird = require('bluebird')
const db = require('../../db/db')

module.exports = {
  create,
  getById,
  getFromPlayerTrackData,
  random,
  upvote,
  downvote,
  hasUserUpvotedTheTrack,
  formatWithUpvotes,
  verifyIfTrackDoesNotAlreadyExistsInGenre,
}

function create(trackToAdd, musicGenre) {
  return db.Track.create(trackToAdd).then((track) => musicGenre.addTrack(track).return(track))
}

// ------------------------------------------------------

function getById(id) {
  return db.Track.getById(id)
}

// ------------------------------------------------------

function getFromPlayerTrackData({ playerName, playerTrackId }) {
  return db.Track.findOne({ where: { playerName, playerTrackId } })
}

// ------------------------------------------------------

function hasUserUpvotedTheTrack(trackId, userHash) {
  return db.Vote.count({
    where: {
      trackId,
      userHash,
    },
  }).then((count) => count > 0)
}

// ------------------------------------------------------

function formatWithUpvotes(tracks) {
  return tracks
    .sort((a, b) => {
      return b.MusicGenreTrack.upvotes - a.MusicGenreTrack.upvotes
    })
    .map((musicGenre) => ({
      upvotes: musicGenre.MusicGenreTrack.upvotes,
      ..._.omit(musicGenre, 'MusicGenreTrack'),
    }))
}

// ------------------------------------------------------

function verifyIfTrackDoesNotAlreadyExistsInGenre(trackToCreate, musicGenre) {
  return db.Track.findOne({
    attributes: ['id'],
    where: {
      playerName: trackToCreate.playerName,
      playerTrackId: trackToCreate.playerTrackId,
    },
    include: [
      {
        model: db.MusicGenre,
        where: { id: musicGenre.id },
        attributes: ['id', 'name', 'slug'],
      },
    ],
  }).then((track) => {
    if (!track) {
      return musicGenre
    }
    return bluebird.reject({
      message: `Track already listed in "${musicGenre.name}"`,
      code: 'track-already-listed',
      payload: {
        trackToCreate,
        musicGenre: musicGenre.get({ plain: true }),
      },
    })
  })
}

// ------------------------------------------------------

async function random() {
  const track = (
    await db.Track.find({
      attributes: ['id', 'playerName', 'playerTrackId', 'title'],
      order: [db.Sequelize.fn('RAND')],
      include: {
        model: db.MusicGenre,
        attributes: ['id', 'name', 'slug'],
      },
    })
  ).get({ plain: true })
  const musicGenresByUpvotes = track.MusicGenres.sort((genreA, genreB) => {
    return genreA.MusicGenreTrack.upvotes - genreB.MusicGenreTrack.upvotes
  })
  const musicGenre = {
    id: musicGenresByUpvotes[0].id,
    name: musicGenresByUpvotes[0].name,
    slug: musicGenresByUpvotes[0].slug,
  }
  return {
    track: _.omit(track, 'musicGenre'),
    musicGenre,
  }
}

// ------------------------------------------------------

function upvote(data) {
  const { trackId, musicGenreId, userHash } = data

  return bluebird
    .props({
      vote: db.Vote.findOne({ where: { userHash, trackId, musicGenreId } }),
      track: db.Track.findById(trackId, { attributes: ['id'] }),
      musicGenre: db.MusicGenre.findById(musicGenreId, { attributes: ['id'] }),
      musicGenreTrack: db.MusicGenreTrack.findOne({
        where: { trackId, musicGenreId },
      }),
    })
    .then((res) => {
      if (!res.track) {
        return bluebird.reject({
          status: 404,
          code: 'track-not-found',
          message: 'The track to upvote has not been found.',
          payload: { data },
        })
      }
      if (!res.musicGenre) {
        return bluebird.reject({
          status: 404,
          code: 'musicGenre-not-found',
          message: 'The musicGenre in which to upvote the track has not been found.',
          payload: { data },
        })
      }
      if (!res.musicGenreTrack) {
        return bluebird.reject({
          status: 404,
          code: 'musicGenreTrack-not-found',
          message: 'The link between the genre and the track has not been found.',
          payload: { data },
        })
      }
      if (res.vote) {
        return bluebird.reject({
          message: 'This client has already voted for that track in that genre',
          code: 'already-voted',
          payload: { data },
        })
      }

      return bluebird.props({
        registerVote: registerVote(res.track, res.musicGenre, userHash),
        incrementVoteCount: incrementVoteCount(res.musicGenreTrack),
      })
    })
    .then((res) => {
      return { upvotes: res.incrementVoteCount.upvotes }
    })
}

function registerVote(track, musicGenre, userHash) {
  return db.Vote.create({ userHash })
    .then((vote) => track.addVote(vote).return(vote))
    .then((vote) => musicGenre.addVote(vote))
}

function incrementVoteCount(musicGenreTrack) {
  musicGenreTrack.upvotes += 1
  return musicGenreTrack.save()
}

// ------------------------------------------------------

function downvote(data) {
  const { trackId, musicGenreId, userHash } = data

  return bluebird
    .props({
      vote: db.Vote.findOne({ where: { userHash, trackId, musicGenreId } }),
      musicGenreTrack: db.MusicGenreTrack.findOne({
        where: { trackId, musicGenreId },
      }),
    })
    .then((res) => {
      if (!res.vote) {
        return bluebird.reject({
          message: 'This client has not voted for that track in that genre',
          code: 'vote-not-found',
          payload: { data },
        })
      }
      if (!res.musicGenreTrack) {
        return bluebird.reject({
          status: 404,
          code: 'musicGenreTrack-not-found',
          message: 'The link between the genre and the track has not been found.',
          payload: { data },
        })
      }

      return bluebird.props({
        destroy: res.vote.destroy(),
        decrement: decrementVoteCount(res.musicGenreTrack),
      })
    })
}

function decrementVoteCount(musicGenreTrack) {
  musicGenreTrack.upvotes -= 1
  return musicGenreTrack.save()
}
