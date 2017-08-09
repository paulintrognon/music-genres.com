'use strict';

const logger = require('./logger');

module.exports = errorMiddleware;

function errorMiddleware(promise, req, res, next) {
  if (promise instanceof Error) {
    handleError(promise);
    return;
  }

  if (!promise.then) {
    res.send({ result: promise });
    next();
    return;
  }

  promise
      .then(result => res.status(200).send({ result }))
      .catch(handleError)
      .catch(next);

  function handleError(error) {
    logger.error(error);
    res.send({
      error: true,
      message: error.message,
    });
  }
}
