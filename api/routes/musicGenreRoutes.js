'use strict';

const express = require('express');
const router = express.Router();

const musicGenreController = require('../controllers/musicGenreController.js');

router.post('/create', (req, res, next) => next(musicGenreController.createMusicGenre(req)));
router.get('/:id/with-tracks', (req, res, next) => next(musicGenreController.getWithTracks(req)));

module.exports = router;