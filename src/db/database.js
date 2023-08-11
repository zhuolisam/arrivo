const pgp = require('pg-promise')();

const { dbConfig } = require('../config/config');

const db = pgp(dbConfig.url);

module.exports = db;
