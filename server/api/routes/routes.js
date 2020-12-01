module.exports = addRoutes

function addRoutes(app) {
  // API ROUTES
  const apiRoutes = require('./api')
  app.use('/api', apiRoutes)

  // MUSIC GENRES ROUTES
  const musicGenreRoutes = require('./musicGenreRoutes.js')
  app.use('/api/music-genres', musicGenreRoutes)

  // TRACKS ROUTES
  const trackRoutes = require('./trackRoutes.js')
  app.use('/api/tracks', trackRoutes)
}
