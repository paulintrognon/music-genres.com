const Sequelize = require('sequelize');
const sequelize = require('../db.js').sequelize;

const Track = sequelize.define('track', {
  serviceName: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true,
    len: [3, 30],
  },
  serviceTrackId: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true,
    len: [1, 255],
  },
  /*title: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true,
    len: [1, 100],
  },*/
  upvotes: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

module.exports = Track;
