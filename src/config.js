const dotenv = require('dotenv');

dotenv.config();

const {
    PORT = 3000,
    JWT_SECRET,
    NODE_ENV = 'development',
    BYCRYPT_SALT,
    DB_HOST = 'localhost',
    DB_USER = 'sa',
    DB_PASSWORD = 'root@123',
    DB_NAME = 'User_Management',
    DB_PORT = 1435,
} = process.env;

module.exports = {
    PORT,
    JWT_SECRET,
    NODE_ENV,
    BYCRYPT_SALT,
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_PORT,
};