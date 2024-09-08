const sql = require('mssql');
const config = {
    server: 'localhost',
    database: 'User_Management',
    user: 'sa',
    password: 'root@123',
    port: 1435,
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

module.exports = {
    sql, config
};