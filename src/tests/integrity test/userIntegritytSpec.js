const users = require('../../models/Users');
const { config, sql} = require('../../database')
const bycrypt = require('bcrypt');
const environment = require('../../config');

describe('User Model integrity test', () => {
    const user = {
        username: 'testuser',
        email: 'testEmail',
        password: 'testPassword'
    };
    beforeAll(async () => {
        await users.create(user);
        const createdUser = await users.findByUsername('testuser');
        user.id = createdUser.id;
    });
    afterAll(async () => {
        const pool = await sql.connect(config);
        await pool.request().query('DELETE FROM Users;');
    });
    it('created user must have the right data', async () => {
        const user = {
            username: 'testuser1',
            email: 'testEmail1',
            password: 'testPassword1'
        };
        await users.create(user);
        const userCreated = await users.findByUsername('testuser1');
        expect(userCreated.username).toBe('testuser1');
        expect(userCreated.email).toBe('testEmail1');
        expect(userCreated.password).not.toBe(bycrypt.hash(`testPassword1${environment.BYCRYPT_PEPPER}`, parseInt(environment.BYCRYPT_SALT)));
    });

    it('the found user should be correct', async () => {
        const user = await users.findByUsername('testuser');
        expect(user.username).toBe('testuser');
        expect(user.email).toBe('testEmail');
        expect(user.password).not.toBe(bycrypt.hash(`testPassword${environment.BYCRYPT_PEPPER}`, parseInt(environment.BYCRYPT_SALT)));
    });

    it('found user by id should be correct', async () => {
        const userById = await users.findById(user.id);
        expect(userById.username).toBe('testuser');
        expect(userById.email).toBe('testEmail');
        expect(userById.password).not.toBe(bycrypt.hash(`testPassword${environment.BYCRYPT_PEPPER}`, parseInt(environment.BYCRYPT_SALT)));
    });
});