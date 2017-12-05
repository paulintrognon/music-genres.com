'use strict';

const express = require('express');
const router = express.Router();

const trackController = require('../controllers/trackController.js');

router.post('/add', (req, res, next) => next(trackController.addTrack(req)));
router.get('/random', (req, res, next) => next(trackController.getRandomTrack()));
router.post('/upvote', (req, res, next) => next(trackController.upvoteTrack(req)));
router.post('/downvote', (req, res, next) => next(trackController.downvoteTrack(req)));
router.post('/parseUrl', (req, res, next) => next(trackController.parseTrackUrl(req)));

module.exports = router;
