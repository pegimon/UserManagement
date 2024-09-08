const {config, sql} = require('../database');
const environment = require('../config');
const bycrypt = require('bcrypt');

class Users {
    async create(user) {
        const pool = await sql.connect(config);
        const hash = await bycrypt.hash(`${user.password}${environment.BYCRYPT_PEPPER}` , parseInt(environment.BYCRYPT_SALT));
        const result = await pool.request()
            .input('username', sql.NVarChar, user.username)
            .input('password', sql.NVarChar, hash)
            .input('email', sql.NVarChar, user.email)
            .query('INSERT INTO Users (username, email, password) VALUES (@username, @email, @password);');
        return result;
    }

    async findByUsername(username) {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('username', sql.NVarChar, username)
            .query('SELECT * FROM Users WHERE username = @username;');
        return result.recordset[0];
    }

    async findById(id) {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM Users WHERE id = @id;');
        return result.recordset[0];
    }
}

module.exports = new Users();