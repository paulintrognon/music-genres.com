'use strict';

const _ = require('lodash');
const MusicGenre = require('../models/MusicGenre');
const Track = require('../models/Track');

module.exports = createManager();

function createManager() {
  const manager = {};

  manager.create = create;
  manager.get = get;
  manager.getWithTracks = getWithTracks;

  return manager;

  // ------------------------------------------------------

  function create(data) {
    return MusicGenre.create({
      name: data.name,
      slug: _.kebabCase(data.name),
    });
  }

  function get(id) {
    return MusicGenre.findById(id);
  }

  function getWithTracks(id) {
    return MusicGenre.findById(id, {
      attributes: ['id', 'name', 'slug'],
      include: [{
        model: Track,
        attributes: ['id', 'url', 'upvotes'],
      }],
      order: [
        [Track, 'upvotes', 'DESC'],
      ],
    });
  }
}
