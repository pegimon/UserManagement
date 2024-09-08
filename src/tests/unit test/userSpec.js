const users = require('../../models/Users');
const { config, sql} = require('../../database')

describe('User Model Unit Test', () => {
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
    it('should create a new user', async () => {
        const user = {
            username: 'testuser1',
            email: 'testEmail1',
            password: 'testPassword1'
        };
        const result = await users.create(user);
        expect(result.rowsAffected[0]).toBe(1);
    });

    it('should find user by username', async () => {
        const user = await users.findByUsername('testuser');
        expect(user.username).toBe('testuser');
    });

    it('should find user by id', async () => {
        const userById = await users.findById(user.id);
        expect(userById.username).toBe('testuser');
    });

    it('should not find user by username', async () => {
        const user = await users.findByUsername('testuser2');
        expect(user).toBe(undefined);
    });

    it('should not find user by id', async () => {
        const userById = await users.findById(100);
        expect(userById).toBe(undefined);
    });
});