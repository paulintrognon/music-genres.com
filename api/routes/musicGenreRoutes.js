'use strict';

const express = require('express');
const router = express.Router();

const musicGenreController = require('../controllers/musicGenreController.js');

router.post('/create', (req, res, next) => next(musicGenreController.createMusicGenre(req)));

module.exports = router;
