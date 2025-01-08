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
        let connection: Connection | null = null;
        let error;
        try {
            connection = await initConnection();
            if (!connection) {
                throw new Error('No database connection returned');
            }
        } catch (e) {
            console.error('Error connecting to the database:', e);
            error = e;
        }
        expect(error).toBeUndefined();
        expect(connection).toBeDefined();
        if (connection) {
            await connection.end();
        }
        if (error) {
            console.error('Error connecting to the database:', error);
        }
    });
});
