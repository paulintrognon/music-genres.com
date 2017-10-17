'use strict';

const _ = require('lodash');
const bluebird = require('bluebird');
const MusicGenre = require('../../db/models/MusicGenre');
const trackManager = require('./trackManager');
const Track = require('../../db/models/Track');

module.exports = createManager();

function createManager() {
  const manager = {};

  manager.create = create;
  manager.getOrFail = getOrFail;
  manager.getWithTracks = getWithTracks;
  manager.search = search;

  return manager;

  // ------------------------------------------------------

  function create(data) {
    return bluebird.map(data.parentIds || [], checkMusicGenreExistance)
      .then(parents => {
        return MusicGenre.create({
          name: data.name,
          slug: _.kebabCase(data.name),
        })
          .then(musicGenre => addParents(musicGenre, parents));
      });
  }

  function getOrFail(id) {
    return MusicGenre.findById(id)
      .then(musicGenre => {
        if (musicGenre) {
          return musicGenre;
        }
        return bluebird.reject({
          status: 404,
          code: 'music-genre-not-found',
          message: `The music genre with id ${id} does not exist.`,
          payload: { id },
        });
      });
  }

  function getWithTracks(id) {
    return MusicGenre.findById(id, {
      attributes: ['id', 'name', 'slug'],
      include: [{
        model: Track,
        attributes: ['id', 'title', 'playerName', 'playerTrackId'],
      }],
    })
      .then(res => res.get({ plain: true }))
      .then(res => {
        res.tracks = trackManager.formatWithUpvotes(res.tracks);
        return res;
      });
  }

  function search(query, limit) {
    const sqlQuery = {
      attributes: ['name', 'slug'],
      where: {
        name: {
          $like: `%${query}%`,
        },
      },
    };
    if (limit) {
      sqlQuery.limit = limit;
    }
    return MusicGenre.findAll(sqlQuery);
  }

  // ------------------------------------------------------

  function addParents(musicGenre, parents) {
    return bluebird.map(parents, parent => musicGenre.addParent(parent))
      .return(musicGenre);
  }

  function checkMusicGenreExistance(musicGenreId) {
    return MusicGenre.findById(musicGenreId)
      .then(musicGenre => {
        if (musicGenre) {
          return musicGenre;
        }
        return bluebird.reject({
          status: 404,
          code: 'music-genre-not-found',
          message: `Music genre with ID ${musicGenreId} not found`,
          payload: { musicGenreId },
        });
      });
  }
}
