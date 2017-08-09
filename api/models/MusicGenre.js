const Sequelize = require('sequelize');
const sequelize = require('../db.js').sequelize;

const MusicGenre = sequelize.define('music_genre', {
  name: {
    type: Sequelize.STRING,
  },
});

MusicGenre.sync();

module.exports = MusicGenre;
