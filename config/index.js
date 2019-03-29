require('dotenv').config();

const merge = require("lodash.merge");

const env = process.env.NODE_ENV || "development";

const baseConfig = {
    env,
    isDev: env === "development",
    isTest: env === "test",
    isProd: env === "production",
    port: 8080,
    secrets: {
        jwt: process.env.JWT_SECRET || "randomtext",
        jwtExp: "30d"
    },
    db: {
        client: process.env.DB_CLIENT,
        connection: {
            host: process.env.DB_HOST,
            user     : process.env.DB_USER,
            database : process.env.DB_NAME,
            port     : process.env.DB_PORT,
        },
        migrations: {
            directory: './migrations',
            tableName: 'migrations'
        }
    },
    corsOptions: {
        optionsSuccessStatus: 200,
    }
}

let envConfig = {};

switch (env) {
    case "dev":
    case "development":
        envConfig = require("./development").config;
        break;
    case "test":
    case "testing":
        envConfig = require("./test").config;
        break;
    case "prod":
    case "production":
        envConfig = require("./production").config;
        break;
}

const config = merge(baseConfig, envConfig);

module.exports = {
    config
};
