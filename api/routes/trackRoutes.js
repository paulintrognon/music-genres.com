'use strict';

const express = require('express');
const router = express.Router();

const trackController = require('../controllers/trackController.js');

router.post('/add', (req, res, next) => next(trackController.addTrack(req)));
router.get('/random', (req, res, next) => next(trackController.getRandomTrack()));
router.post('/upvote/:trackId', (req, res, next) => next(trackController.upvoteTrack(req)));

module.exports = router;
