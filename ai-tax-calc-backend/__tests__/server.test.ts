import request from 'supertest';
import { initConnection } from '../src/routes/auth/db';
import express from 'express';
import { Connection } from 'mysql2/promise';
import { TaxFormData } from '../src/routes/auth/models/tax';
import { calculateTax } from '../src/routes/calculate-tax/util';

const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Welcome to the TypeScript Express server!');
});

app.post('/calculate-tax', (req, res) => {
    console.log(req.body)
    const result = calculateTax(req.body);
    res.json(result);
});

describe('Server tests', () => {
    it('should return a 200 status for "/"', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toContain('Welcome');
    });

    it('should be able to calculate tax data', async () => {
        const formData: TaxFormData = {
            grossMonth: 900,
            numOfSalaries: 14,
            taxRate: 16
        }

        const response = await request(app).post('/calculate-tax').send(formData);
        expect(response.status).toBe(200);
    })

    //Works locally but not on github actions
    // it('should connect to the database successfully', async () => {
    //     let connection: Connection | null = null;
    //     let error;
    //     try {
    //         connection = await initConnection();
    //         if (!connection) {
    //             throw new Error('No database connection returned');
    //         }
    //     } catch (e) {
    //         console.error('Error connecting to the database:', e);
    //         error = e;
    //     }
    //     expect(error).toBeUndefined();
    //     expect(connection).toBeDefined();
    //     if (connection) {
    //         await connection.end();
    //     }
    //     if (error) {
    //         console.error('Error connecting to the database:', error);
    //     }
    // });
});


