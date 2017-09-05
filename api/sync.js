const db = require('./services/db');

db.connect()
  .then(() => db.sync())
  .then(() => db.close());
