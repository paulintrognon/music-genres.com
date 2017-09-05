const index = require('./index');

index.connect()
  .then(() => index.sync())
  .then(() => index.close());
