const crypto = require('crypto');

const secret = 'music-genres-hash-of-death';

module.exports = createService();

function createService() {
  const service = {};

  service.getUserHashFromRequest = getUserHashFromRequest;

  return service;

  // ------------------------------------------------------

  function getUserHashFromRequest(req) {
    const { ip } = req;
    const userAgent = req.headers['user-agent'];
    return hash(`${ip}_${userAgent}`);
  }

  function hash(string) {
    return crypto
      .createHmac('sha256', secret)
      .update(string)
      .digest('hex');
  }
}
