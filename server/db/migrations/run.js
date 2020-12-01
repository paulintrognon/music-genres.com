const _ = require('lodash')
const bluebird = require('bluebird')
const path = require('path')
const readFile = bluebird.promisify(require('fs').readFile)
const logger = require('../../logger')

const { sequelize } = require('../db')

const start = process.argv[2] || 1
const end = process.argv[3] || start

const range = _.range(start, end)
range.push(end)

return bluebird.each(range, async (version) => {
  const buffer = await readFile(path.join(__dirname, `${version}.sql`))
  logger.info(`Running ${version}.sql`)
  const sql = buffer.toString()
  return sequelize.query(sql, { raw: true })
})
