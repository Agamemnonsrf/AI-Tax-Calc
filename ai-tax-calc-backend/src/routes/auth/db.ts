import mysql from 'mysql2/promise';
import mysql2 from 'mysql2';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

export const initConnection = async () => {
    if (!process.env.DB_HOST || !process.env.DB_PORT || !process.env.DB_USER || !process.env.DB_PASS || !process.env.DB_NAME) {
        throw new Error('DB_HOST is not defined');
    }

    return mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        port: parseInt(process.env.DB_PORT, 10),

    });
}

export const createUsersTable = async () => {
    const connection = await initConnection();

    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;

    connection.execute(createTableQuery);
    connection.end();
};



