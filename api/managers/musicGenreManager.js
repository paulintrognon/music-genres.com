'use strict';

const _ = require('lodash');
const bluebird = require('bluebird');
const MusicGenre = require('../models/MusicGenre');
const Track = require('../models/Track');

module.exports = createManager();

function createManager() {
  const manager = {};

  manager.create = create;
  manager.getWithTracks = getWithTracks;

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

  function getWithTracks(id) {
    return MusicGenre.findById(id, {
      attributes: ['id', 'name', 'slug'],
      include: [{
        model: Track,
        attributes: ['id', 'serviceName', 'serviceTrackId', 'upvotes'],
      }],
      order: [
        [Track, 'upvotes', 'DESC'],
      ],
    });
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
