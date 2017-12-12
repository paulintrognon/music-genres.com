const Sequelize = require('sequelize');
const sequelize = require('../db.js').sequelize;

const Vote = sequelize.define('vote', {
  userHash: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true,
    len: 100,
  },
}, {
  deletedAt: false,
  paranoid: false,
});

module.exports = Vote;
