'use strict';

const config = require('../config');
const cors = require('cors');
const express = require('express');
const http = require('http');
const logger = require('./logger');

const app = express();
app.use(cors());

const port = config.api && config.api.port || 3001;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => {
  const address = server.address();
  logger.debug(`debug`);
  logger.info(`API up and running on ${address.address}:${address.port}`);
});
