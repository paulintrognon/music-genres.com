const es = require('./es');

es.connect()
  .then(() => es.sync())
  .then(() => es.close());
