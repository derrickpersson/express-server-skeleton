const config = require("../config").config;

const knex = require("knex")(config.db);
const knexLogger = require('knex-logger')(knex);

module.exports = {
    knex,
    knexLogger,
};
