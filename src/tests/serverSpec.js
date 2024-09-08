const app = require('../index');
const supertest = require('supertest');

const request = supertest(app);

describe('testing server status', () => {
    it('should return status 200', async () => {
        const response = await request.get('/status');
        expect(response.status).toBe(200);
    });
});