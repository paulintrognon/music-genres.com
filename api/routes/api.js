'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    next('hello world!');
});

module.exports = router;
