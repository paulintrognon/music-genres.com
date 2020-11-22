module.exports = {
  host: process.env.FRONT_URL || 'http://localhost:3000',
  api: {
    baseUrl: process.env.API_URL || 'http://localhost:3001/api',
    logger: {
      console: {
        level: 'debug',
      },
    },
  },
};
