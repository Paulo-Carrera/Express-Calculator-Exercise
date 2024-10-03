// test/app.test.js
const request = require('supertest');
const app = require('./app'); // Adjust this path as necessary based on your project structure

describe('GET /mean', () => {
    it('should return the mean of the numbers', async () => {
        const res = await request(app).get('/mean?nums=1,2,3');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ operation: 'mean', value: 2 });
    });

    it('should return 400 if nums are required', async () => {
        const res = await request(app).get('/mean');
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ error: 'nums are required.' });
    });

    it('should return 400 for invalid number', async () => {
        const res = await request(app).get('/mean?nums=foo,2,3');
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ error: 'foo is not a number.' });
    });
});

describe('GET /median', () => {
    it('should return the median of the numbers', async () => {
        const res = await request(app).get('/median?nums=1,2,3,4,5');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ operation: 'median', value: 3 });
    });

    it('should return 400 if nums are required', async () => {
        const res = await request(app).get('/median');
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ error: 'nums are required.' });
    });

    it('should return 400 for invalid number', async () => {
        const res = await request(app).get('/median?nums=foo,2,3');
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ error: 'foo is not a number.' });
    });
});

describe('GET /mode', () => {
    it('should return the mode of the numbers', async () => {
        const res = await request(app).get('/mode?nums=1,2,2,3,4');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ operation: 'mode', value: '2' });
    });

    it('should return 400 if nums are required', async () => {
        const res = await request(app).get('/mode');
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ error: 'nums are required.' });
    });

    it('should return 400 for invalid number', async () => {
        const res = await request(app).get('/mode?nums=foo,2,3');
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ error: 'foo is not a number.' });
    });
});
