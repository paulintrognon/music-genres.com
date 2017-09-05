'use strict';

const appPackage = require('../../../package.json');

module.exports = createController();

function createController() {
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
