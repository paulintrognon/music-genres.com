'use strict';

const MusicGenre = require('./MusicGenre.js');
MusicGenre.belongsToMany(MusicGenre, { as: 'Parents', through: 'music_genre_parents' });

const Track = require('./Track.js');
MusicGenre.hasMany(Track);
Track.belongsTo(MusicGenre);

const Vote = require('./Vote.js');
Track.hasMany(Vote);
Vote.belongsTo(Track);
