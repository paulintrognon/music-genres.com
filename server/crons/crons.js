const { CronJob } = require('cron');
const logger = require('../logger');
// const checkDeletedSources = require('./checkDeletedSources');

module.exports = {
  startCrons,
};

function startCrons() {
  logger.info('Starting the cron jobs...');

  // Daily at 5am
  // schedule('Check deleted sources', '0 0 5 * * *', () => {
  //   checkDeletedSources();
  // });
}

function schedule(name, when, callback) {
  return new CronJob(
    when,
    () => {
      logger.info(`Start cron '${name}' (scheduled on ${when})`);
      callback();
    },
    null,
    true,
    'Europe/Paris'
  );
}
