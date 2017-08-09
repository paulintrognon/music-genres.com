const Sequelize = require('sequelize');
const sequelize = require('../db.js').sequelize;

const MusicGenre = sequelize.define('music_genre', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true,
    len: [2, 100],
  },
}, {
  indexes: [
    {
      unique: true,
      fields: ['name'],
    },
  ],
});

MusicGenre.sync({ alter: true });

module.exports = MusicGenre;
