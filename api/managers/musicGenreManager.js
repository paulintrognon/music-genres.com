'use strict';

const _ = require('lodash');
const MusicGenre = require('../models/MusicGenre.js');

module.exports = createManager();

function createManager() {
  const manager = {};

  manager.create = create;
  manager.get = get;

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
}
