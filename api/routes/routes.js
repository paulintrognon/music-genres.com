'use strict';

module.exports = addRoutes;

function addRoutes(app) {
  // API ROUTES
  const apiRoutes = require('./api');
  app.use('/api', apiRoutes);

  // MUSIC GENRES ROUTES
  const musicGenresRoutes = require('./musicGenres');
  app.use('/api/music-genres', musicGenresRoutes);
}
