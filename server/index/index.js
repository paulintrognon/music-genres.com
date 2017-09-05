'use strict';

const _ = require('lodash');
const bluebird = require('bluebird');
const config = require('../config').index;
const logger = require('./../logger.js');
const elasticsearch = require('elasticsearch');

const settings = require('./settings.json');
const musicGenreTypeMapping = require('./mappings/music-genre');

module.exports = createIndex();

function createIndex() {
  const index = {
    client: null,
  };

  index.connect = connect;
  index.sync = sync;
  index.close = close;

  return index;

  // ------------------------------------------------------

  function connect(options = {}) {
    logger.debug('Connecting to index...', {
      host: config.host,
    });

    index.client = new elasticsearch.Client(_.assign({
      host: config.host,
      log: 'info',
    }, options));

    return bluebird.resolve(index.client);
  }

  function sync() {
    return index.client.indices.create({
      index: 'music-genres',
      body: {
        settings,
        mappings: {
          'music-genre': musicGenreTypeMapping,
        },
      },
    });
  }

  function close() {
    if (!index.client) {
      logger.warning('index not connected - cannot close');
      return bluebird.resolve();
    }
    logger.info('index connection closed');
    return index.client.close();
  }
}
