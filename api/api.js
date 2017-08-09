'use strict';

const config = require('../config');
const cors = require('cors');
const express = require('express');
const http = require('http');
const logger = require('./logger');

/**
 * Creating the app
 */
const app = express();
app.use(cors());

/**
 * Adding the routes
 */
require('./routes/routes')(app);

/**
 * Adding the response middleware
 */
const response = require('./response');
app.use(response)

/**
 * Configuring the app
 */
const port = config.api && config.api.port || 3001;
app.set('port', port);

/**
 * Starting the app
 */
const server = http.createServer(app);
server.listen(port, () => {
  const address = server.address();
  logger.info(`API up and running on ${address.address}:${address.port}`);
});
