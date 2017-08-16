'use strict';

const Track = require('../models/Track.js');

module.exports = createManager();

function createManager() {
  const manager = {};

  manager.create = create;

  return manager;

  // ------------------------------------------------------

  function create(data) {
    return Track.create({
      url: data.url,
    });
  }
}
