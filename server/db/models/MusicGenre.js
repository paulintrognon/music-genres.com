const Sequelize = require('sequelize');
const sequelize = require('../db.js').sequelize;

const MusicGenre = sequelize.define('musicGenre', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true,
    len: [2, 100],
    unique: true,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true,
    len: [2, 100],
    unique: true,
  },
});

module.exports = MusicGenre;
