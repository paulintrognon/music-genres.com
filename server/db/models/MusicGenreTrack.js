const Sequelize = require('sequelize');
const { sequelize } = require('../db.js');

const MusicGenreTrack = sequelize.define('musicGenreTrack', {
  upvotes: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

module.exports = MusicGenreTrack;
