/**
 * Checking config existance
 */
const path = require('path');
const fs = require('fs');

/**
 * Loading dependencies
 */
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const http = require('http');
const config = require('../config');
const logger = require('../logger');
const crons = require('../crons/crons');

/**
 * Creating the app
 */
const app = express();
app.use(cors());
app.use(bodyParser.json()); // for parsing application/json

/**
 * Configuring the app
 */
const port = (config && config.port) || 3001;
app.set('port', port);

/**
 * Connecting to MySQL
 * /!\ We need to connect to mysql first thing in order to have sequelize initialized
 */
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

/**
 * Starting the crons
 */
crons.startCrons();
