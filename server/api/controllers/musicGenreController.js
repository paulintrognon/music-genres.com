const _ = require('lodash')
const bluebird = require('bluebird')

const musicGenreManager = require('../managers/musicGenreManager')
const userService = require('../services/user')
const trackService = require('../services/trackService')

module.exports = {
  createMusicGenre,
  getAll,
  getSomeRandom,
  getWithTracks,
  search,
}

function createMusicGenre(req) {
  const parentId = req.body.parentId ? _.castArray(req.body.parentId) : []
  const parentIds = req.body.parentIds ? _.castArray(req.body.parentIds) : []

  return musicGenreManager.create({
    name: req.body.name,
    parentIds: _.uniq(parentId.concat(parentIds)).sort(),
  })
}

function getAll() {
  return musicGenreManager.getAll()
}
function getSomeRandom(req) {
  const nb = req.params.nb || 3
  return musicGenreManager.getSomeRandom(nb)
}

async function getWithTracks(req) {
  const { musicGenre, userHash } = await bluebird.props({
    musicGenre: musicGenreManager.getWithTracks(req.params.slug),
    userHash: userService.getUserHashFromRequest(req),
  })
  const tracks = await trackService.checkIfUserHasUpvotedTheTracks(musicGenre.tracks, userHash)
  musicGenre.tracks = tracks
  return musicGenre
}

function search(req) {
  return musicGenreManager.search(req.query.query, parseInt(req.query.limit, 10))
}
