const sql = require('mssql');
const environment = require('./config');
const config = {
    server: environment.DB_HOST,
    database: environment.DB_NAME,
    user: environment.DB_USER,
    password: environment.DB_PASSWORD,
    port: parseInt(environment.DB_PORT),
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

module.exports = {
    sql, config
};