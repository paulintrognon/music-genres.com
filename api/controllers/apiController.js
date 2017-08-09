'use strict';

const appPackage = require('../../package.json');

module.exports = createApiController();

function createApiController() {
  const controller = {};

  controller.ping = ping;

  return controller;

  // ------------------------------------------------------

  function ping() {
    return {
      name: appPackage.name,
      version: appPackage.version,
    };
  }
}
