const appPackage = require('../../../package.json');

module.exports = {
  ping: () => ({
    name: appPackage.name,
    version: appPackage.version,
  }),
};
