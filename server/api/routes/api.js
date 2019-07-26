const express = require('express');

const router = express.Router();

const apiController = require('../controllers/apiController.js');

router.get('/', (req, res, next) => next(apiController.ping(req)));

module.exports = router;
