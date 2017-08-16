const Sequelize = require('sequelize');
const sequelize = require('../db.js').sequelize;

const MusicGenre = require('./MusicGenre.js');

const Track = sequelize.define('track', {
  url: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true,
    len: [5, 200],
  },
});

Track.belongsTo(MusicGenre);

Track.sync();

module.exports = Track;
