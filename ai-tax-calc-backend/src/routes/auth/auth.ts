import express, { Request, RequestHandler, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserByUsername, User } from './models/user';
import dotenv from 'dotenv';
import { Query } from 'mysql2/typings/mysql/lib/protocol/sequences/Query';
import { QueryResult } from 'mysql2/promise';


dotenv.config();
const router = express.Router();
const SECRET_KEY = process.env.DB_SECRET_KEY;


interface SignUpRequestBody {
    usernameSignUp: string;
    passwordSignUp: string;
}

type SignUpResponseBody =
    | { message: string; token: string }
    | { error: string };

const signUpHandler: RequestHandler<{}, SignUpResponseBody, SignUpRequestBody> = async (req, res) => {
    const { usernameSignUp, passwordSignUp } = req.body;
    console.log('Received signup request:', { usernameSignUp, passwordSignUp });
    if (!SECRET_KEY) {
        res.status(500).json({ error: 'No DB key present' });
        return;
    }

    try {
        const hashedPassword = await bcrypt.hash(passwordSignUp, 10);
        console.log('Hashed password:', hashedPassword);

        const user = await createUser(usernameSignUp, hashedPassword);
        const userId = (user as any).insertId;
        if (!user || userId === undefined) {
            res.status(400).json({ error: 'Error creating user' });
            return;
        }
        console.log('User created:', user);
        const token = jwt.sign(
            { id: userId, username: usernameSignUp },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.status(201).json({ message: 'User created successfully', token });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(400).json({ error: 'Error creating user' });
    }
};

router.post('/signup', signUpHandler);

interface SignInRequestBody {
    usernameSignIn: string;
    passwordSignIn: string;
}

type SignInResponseBody =
    | { message: string; token: string }
    | { error: string };



const signInHandler: RequestHandler<{}, SignInResponseBody, SignInRequestBody> = async (req, res) => {
    const { usernameSignIn, passwordSignIn } = req.body;
    console.log('Received sign in request:', { usernameSignIn, passwordSignIn });
    if (!SECRET_KEY) {
        res.status(500).json({ error: 'No DB key present' });
        return;
    }
    try {
        const userResult: QueryResult | null = await findUserByUsername(usernameSignIn);
        if (!userResult || (userResult as User[]).length === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        const user = (userResult as User[])[0];

        console.log(`Found user:`, user);
        const isPasswordValid = await bcrypt.compare(passwordSignIn, user.password);
        if (!isPasswordValid) {
            console.log('Invalid password');
            res.status(401).json({ error: 'Invalid password' });
            return;
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            SECRET_KEY,
            { expiresIn: '1h' }
        );
        console.log('Signed in successfully:');
        res.status(200).json({
            message: 'Sign in successful',
            token,
        });
    } catch (error) {
        console.error('Error signing in:', error);
        res.status(500).json({ error: 'Error signing in: ' + error });
    }
};

router.post('/signin', signInHandler);
export default router;