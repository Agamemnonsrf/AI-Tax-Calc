import request from 'supertest';
import { initConnection } from '../src/routes/auth/db';
import express from 'express';
import { Connection } from 'mysql2/promise';

const app = express();
app.get('/', (req, res) => {
    res.send('Welcome to the TypeScript Express server!');
});

describe('Server tests', () => {
    it('should return a 200 status for "/"', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toContain('Welcome');
    });

    it('should connect to the database successfully', async () => {
        let connection: Connection | undefined;
        let error;
        try {
            connection = await initConnection();
        } catch (e) {
            error = e;
        }
        expect(connection).toBeDefined();
        expect(error).toBeUndefined();
        if (connection) {
            await connection.end();
        }
    });
});
