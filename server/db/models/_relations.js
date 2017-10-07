'use strict';

const MusicGenre = require('./MusicGenre.js');
MusicGenre.belongsToMany(MusicGenre, { as: 'Parents', through: 'musicGenreParents' });

const Track = require('./Track.js');
const MusicGenreTrack = require('./MusicGenreTrack');
MusicGenre.belongsToMany(Track, { through: MusicGenreTrack });
Track.belongsToMany(MusicGenre, { through: MusicGenreTrack });
MusicGenre.hasMany(MusicGenreTrack);

const Vote = require('./Vote.js');
Track.hasMany(Vote);
Vote.belongsTo(Track);
MusicGenre.hasMany(Vote);
Vote.belongsTo(MusicGenre);
