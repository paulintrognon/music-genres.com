import * as express from 'express'
import * as cors from 'cors'

import pingController from './controllers/pingController'
import genreController from './controllers/genreController'

const API_PORT = 3001

const app = express()

app.use(express.json())
app.use(cors<express.Request>()) // TODO: Remove `<express.Request>` once git.io/JIbCv is closed

app.use('/ping', pingController)
app.use('/genres', genreController)

app.get('/test', (req, res) => {
  res.send({ foo: 'bar' })
})

app.listen(API_PORT, () => {
  console.log(`API listening on ${API_PORT}`)
})
