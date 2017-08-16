'use strict';

const config = require('../config.json').database;
const logger = require('./logger.js');
const Sequelize = require('sequelize');

module.exports = createDb();

function createDb() {
  const db = {
    sequelize: null,
  };

  db.connect = connect;

  return db;

  // ------------------------------------------------------

  function connect() {
    db.sequelize = new Sequelize(config.database, config.user, config.password, {
      host: config.host,
      dialect: 'mysql',
      logging: false,

      dialectOptions: {
        socketPath: '/var/run/mysqld/mysqld.sock',
      },

      define: {
        paranoid: true,
      },

      pool: {
        max: 5,
        min: 0,
        idle: 10000,
      },
    });

    logger.debug('Connecting to database...', {
      database: config.database,
      user: config.user,
      host: config.host,
    });

    return db.sequelize.authenticate()
      .then(() => {
        logger.info('Successfull connection to database', {
          database: config.database,
        });

        // Load relations
        require('./models/_relations.js');
      })
      .catch(err => {
        logger.error('Unable to connect to the database', {
          database: config.database,
          user: config.user,
          host: config.host,
          error: err,
        });
        throw err;
      });
  }
}
