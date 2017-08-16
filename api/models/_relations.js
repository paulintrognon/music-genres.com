'use strict';

const MusicGenre = require('./MusicGenre.js');
const Track = require('./Track.js');

MusicGenre.hasMany(Track);

MusicGenre.sync();
Track.sync();
