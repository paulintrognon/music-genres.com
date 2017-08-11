'use strict';

const bodyParser = require('body-parser');
const config = require('../config');
const cors = require('cors');
const db = require('./db');
const express = require('express');
const http = require('http');
const logger = require('./logger');

/**
 * Creating the app
 */
const app = express();
app.use(cors());
app.use(bodyParser.json()); // for parsing application/json

/**
 * Configuring the app
 */
const port = (config.api && config.api.port) || 3001;
app.set('port', port);

/**
 * Connecting to MySQL
 * /!\ We need to connect to mysql first thing in order to have sequelize initialized
 */
db.connect()
  .then(() => {
    /**
     * Adding the routes
     */
    require('./routes/routes')(app);

    /**
     * Adding the response middleware
     */
    const response = require('./response');
    app.use(response);

    /**
     * Starting the app
     */
    const server = http.createServer(app);
    server.listen(port, () => {
      const address = server.address();
      logger.info(`API up and running on ${address.address}:${address.port}`);
    });
  });
