'use strict';

const _ = require('lodash');
const MusicGenre = require('../models/MusicGenre.js');

module.exports = createManager();

function createManager() {
  const manager = {};

  manager.addTrack = addTrack;
  manager.create = create;
  manager.get = get;

  return manager;

  // ------------------------------------------------------

  function addTrack(track) {
    return MusicGenre.setTrack(track);
  }

  function create(data) {
    return MusicGenre.create({
      name: data.name,
      slug: _.kebabCase(data.name),
    });
  }

  function get(id) {
    return MusicGenre.findById(id);
  }
}
