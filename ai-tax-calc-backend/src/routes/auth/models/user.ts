import mysql from 'mysql2/promise';
import { initConnection } from '../db';
import dotenv from 'dotenv';

dotenv.config();

export interface User {
    id: number,
    username: string,
    password: string,
    created_at: Date
}

export const createUser = async (username: string, password: string) => {
    const connection = await initConnection();
    try {
        const [rows] = await connection.query(
            'INSERT INTO users (username, password) VALUES (?, ?)',
            [username, password]
        );
        return rows;
    } catch (error) {
        console.error('Error creating user:', error);
    } finally {
        await connection.end();
    }
};

export const findUserByUsername = async (username: string) => {
    const connection = await initConnection();
    try {
        const [rows] = await connection.query(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );
        return rows
    } catch (error) {
        console.error('Error finding user by username:', error);
        return null;
    } finally {
        await connection.end();
    }
};