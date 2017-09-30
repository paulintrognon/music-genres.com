'use strict';

const _ = require('lodash');
const bluebird = require('bluebird');
const config = require('config').database;
const path = require('path');
const readFile = bluebird.promisify(require("fs").readFile);

const db = require('../db/db');

db.connect({multipleStatements: true})
  .then(() => runMigrationFiles())
  .finally(() => db.close());

function runMigrationFiles() {
  const start = process.argv[2] || 1;
  const end = process.argv[3] || 99;

  if (!start) {
      console.error('No version specified');
      return;
  }

  const range = _.range(start, end);
  range.push(end);

  return bluebird.each(range, runMigrationFile);
}

function runMigrationFile(version) {
  return readFile(path.join(__dirname, `${version}.sql`))
    .then(buffer => {
      console.log(`Running ${version}.sql`);
      const sql = buffer.toString();
      return db.sequelize.query(sql, { raw: true });
    }, err => {
      console.warn(err.message);
    });
}
