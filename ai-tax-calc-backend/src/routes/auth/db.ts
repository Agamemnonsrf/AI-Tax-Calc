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
    try {
        const connection = await initConnection();
        if (!connection) {
            throw new Error('Error connecting to database');
        }
        console.log('Connected to database');
        const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE (username)
        )
    `;

        const result = await connection.execute(createTableQuery);
        console.log('Created users table:', result);
        connection.end();
    }
    catch (error) {
        console.error('Error creating users table:', error);
    }
};



export const createChatSessionsTable = async () => {
    try {
        const connection = await initConnection();
        const result = await connection.execute(`
        CREATE TABLE IF NOT EXISTS chat_sessions (
            u_id VARCHAR(255) PRIMARY KEY,
            id INT,
            user_id INT NOT NULL,
            session_name VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    `);
        console.log('Created chat sessions table:', result);
        connection.end();
    }
    catch (error) {
        console.error('Error creating chat sessions table:', error);
    }
};

export interface ChatSession {
    id: number;
    user_id: number;
    session_data: any;
    created_at: Date;
}

export const createChatMessagesTable = async () => {
    try {
        const connection = await initConnection();
        const result = await connection.execute(`
        CREATE TABLE IF NOT EXISTS chat_messages (
            id INT AUTO_INCREMENT PRIMARY KEY,
            session_id VARCHAR(255) NOT NULL,
            msg_index INT NOT NULL,
            user_id INT NOT NULL,
            sender VARCHAR(255) NOT NULL,
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (session_id) REFERENCES chat_sessions(u_id)
        )
    `);
        console.log('Created chat messages table:', result);
        connection.end();
    } catch (error) {
        console.error('Error creating chat messages table:', error);
    }
}

enum Sender {
    User = 'user',
    System = 'system',
}

export interface ChatMessage {
    id: number;
    session_id: number;
    user_id: number;
    sender: Sender;
    message: string;
    created_at: Date;
}

