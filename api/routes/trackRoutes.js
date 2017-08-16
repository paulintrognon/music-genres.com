'use strict';

const express = require('express');
const router = express.Router();

const trackController = require('../controllers/trackController.js');

router.post('/add', (req, res, next) => next(trackController.addTrack(req)));

module.exports = router;
