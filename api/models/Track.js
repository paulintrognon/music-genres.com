const Sequelize = require('sequelize');
const sequelize = require('../db.js').sequelize;

const Track = sequelize.define('track', {
  url: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true,
    len: [5, 200],
  },
});

module.exports = Track;
