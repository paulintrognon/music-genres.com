const db = require('./db');

db.connect()
  .then(() => db.sync())
  .then(() => db.close());
