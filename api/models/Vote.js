const Sequelize = require('sequelize');
const sequelize = require('../services/db.js').sequelize;

const Vote = sequelize.define('vote', {
  userHash: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true,
    len: 100,
  },
});

module.exports = Vote;
