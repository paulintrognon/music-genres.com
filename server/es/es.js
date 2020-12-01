const _ = require('lodash')
const bluebird = require('bluebird')
const config = require('../config').index
const elasticsearch = require('elasticsearch')
const logger = require('./../logger.js')

const settings = require('./settings.json')
const musicGenreTypeMapping = require('./mappings/music-genre')

module.exports = createIndex()

function createIndex() {
  const es = {
    client: null,
  }

  es.connect = connect
  es.init = init
  es.close = close

  return es

  // ------------------------------------------------------

  function connect(options = {}) {
    logger.debug('Connecting to es...', {
      host: config.host,
    })

    es.client = new elasticsearch.Client(
      _.assign(
        {
          host: config.host,
          log: 'info',
        },
        options
      )
    )

    return bluebird.resolve(es.client)
  }

  function init() {
    return es.client.indices.create({
      index: 'music-genres',
      body: {
        settings,
        mappings: {
          'music-genre': musicGenreTypeMapping,
        },
      },
    })
  }

  function close() {
    if (!es.client) {
      logger.warning('es not connected - cannot close')
      return bluebird.resolve()
    }
    logger.info('es connection closed')
    return es.client.close()
  }
}
