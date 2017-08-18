const Sequelize = require('sequelize');
const sequelize = require('../db.js').sequelize;

const Track = sequelize.define('track', {
  url: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true,
    len: [5, 200],
  },
  upvotes: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

module.exports = Track;
