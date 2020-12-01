const es = require('./es')

es.connect()
  .then(() => es.init())
  .then(() => es.close())
