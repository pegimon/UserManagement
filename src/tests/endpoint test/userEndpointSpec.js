const app = require('../../index');
const supertest = require('supertest');
const users = require('../../models/Users');
const { config, sql} = require('../../database')

const request = supertest(app);

describe('user endpoint test', () => {
    const user = {
        username: 'testuser',
        email: 'testEmail',
        password: 'testPassword'
    };
    let token;
    beforeAll(async () => {
        await users.create(user);
        const createdUser = await users.findByUsername('testuser');
        user.id = createdUser.id;
        const response = await request.post('/api/users/login').send({username: 'testuser', password: 'testPassword'});
        token = response.body.token;
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
        const response = await request.post('/api/users/register').send(user);
        expect(response.status).toBe(201);
    });

    it('should not create a user with same username', async () => {
        const user = {
            username: 'testuser',
            email: 'testEmail',
            password: 'testPassword'
        };
        const response = await request.post('/api/users/register').send(user);
        expect(response.status).toBe(400);
    });

    it('should not create a user with missing data', async () => {
        const user = {
            username: 'testuser4',
            email: 'testEmail1'
        }, user2 = {
            email: 'testEmail1',
            password: 'testPassword1'
        }, user3 = {
            username: 'testuser4',
            email: 'testEmail1',
        };
        const response = await request.post('/api/users/register').send(user);
        const response2 = await request.post('/api/users/register').send(user2);
        const response3 = await request.post('/api/users/register').send(user3);
        expect(response.status).toBe(400);
        expect(response2.status).toBe(400);
        expect(response3.status).toBe(400);
    });

    it('should find user by id', async () => {
        const response = await request.get(`/api/users/${user.id}`).set('Authorization', `Bearer ${token}`);;
        expect(response.status).toBe(200);
        expect(response.body.username).toBe('testuser');
    });

    it('should not find user by id that doesn\'t exist', async () => {
        const response = await request.get('/api/users/100').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(404);
    });

    it('shouldn\'t find user by id without token', async () => {
        const response = await request.get(`/api/users/${user.id}`);
        expect(response.status).toBe(401);
    });

    it('should login with the user', async () => {
        const response = await request.post('/api/users/login').send({username: 'testuser', password: 'testPassword'});
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
    });

    it('should not login with wrong credentials', async () => {
        const response = await request.post('/api/users/login').send({username: 'testuser', password: 'testPassword1'});
        expect(response.status).toBe(401);
    });
});