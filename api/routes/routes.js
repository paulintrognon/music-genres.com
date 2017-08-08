'use strict';

module.exports = addRoutes;

function addRoutes(app) {

  // API ROUTES
  const apiRoutes = require('./api');
  app.use('/api', apiRoutes);
}
