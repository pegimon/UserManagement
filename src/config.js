const dotenv = require('dotenv');

dotenv.config();

const {
    PORT = 3000,
    JWT_SECRET = 'secret',
    NODE_ENV = 'development',
    BYCRYPT_SALT = 10,
    BYCRYPT_PEPPER = 'secret',
    DB_HOST = 'localhost',
    DB_USER = 'sa',
    DB_PASSWORD = 'root@123',
    DB_NAME = 'User_Management',
    DB_TEST_NAME = 'User_Management_Test',
    DB_PORT = 1435,
} = process.env;

module.exports = {
    PORT: NODE_ENV === 'development' ? PORT : 3001,
    JWT_SECRET,
    NODE_ENV,
    BYCRYPT_SALT,
    BYCRYPT_PEPPER,
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME: NODE_ENV === 'development' ? DB_NAME : DB_TEST_NAME,
    DB_PORT,
};