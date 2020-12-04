/**
 * Reference: https://jestjs.io/docs/en/webpack.html#mocking-css-modules
 */
const path = require('path')

module.exports = {
  process(src, filename) {
    return 'module.exports = ' + JSON.stringify(path.basename(filename)) + ';'
  },
}
