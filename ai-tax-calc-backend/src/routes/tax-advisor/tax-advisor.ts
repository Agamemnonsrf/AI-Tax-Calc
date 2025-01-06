import express, { Request, Response, RequestHandler } from 'express';
import OpenAI from 'openai';
import jwt from 'jsonwebtoken';
import { createChatMessagesTable, createChatSessionsTable, initConnection } from '../auth/db';
import dotenv from 'dotenv';
const router = express.Router();

dotenv.config();

interface TaxAdviceRequestBody {
    question: string;
    history: OpenAI.Chat.Completions.ChatCompletionMessageParam[];
}
interface TaxAdviceResponseBody {
    answer?: string;
    error?: string;
}

const authorize = (token: string | undefined): string | null => {
    if (!token || !process.env.DB_SECRET_KEY) {
        return null;
    }
    const decoded: any = jwt.verify(token, process.env.DB_SECRET_KEY);
    const userId = decoded.id;
    if (!userId) {
        return null;
    }
    return userId;
}

const taxAdviceHandler: RequestHandler<{}, TaxAdviceResponseBody, TaxAdviceRequestBody> = async (req, res) => {
    const payload = req.body;
    console.log("Received tax advice request:", payload);

    const token = req.headers.authorization?.split(' ')[1];
    if (!authorize(token)) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const competion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: "You are a helpful tax advisor. You answer plainly, straightforwardly, to the point, with short and easy to read responses for the user. Use markdown to format your responses.",
            },
            ...payload.history,
            {
                role: "user",
                content: payload.question,
            },
        ],
    });
    const answer = competion.choices[0].message.content;
    console.log("OpenAI response:", answer);
    if (!answer) {
        res.status(500).json({ error: "Unable to get answer" });
        return;
    }
    res.json({ answer: answer });
};

const taxAdviceHandlerMock: RequestHandler<{}, TaxAdviceResponseBody, TaxAdviceRequestBody> = async (req, res) => {
    const payload = req.body;
    console.log("Received tax advice request:", payload);
    const answer = `This is a mock response to the question: "${payload.question}", because there is no OpenAI API key present.`;
    res.json({ answer: answer });
}
console.log("apikey:" + process.env.OPENAI_API_KEY)
router.post("/tax-advice", process.env.OPENAI_API_KEY ? taxAdviceHandler : taxAdviceHandlerMock);
router.post("/tax-advice-mock", taxAdviceHandlerMock);

type Message = {
    role: "system" | "user";
    content: string;
    index: number;
};

type ChatSession = {
    id: number;
    uId: string;
    message: Message;
    sessionName: string;
};

interface SaveSessionRequestBody {
    sessionData: ChatSession;
}
type SaveSessionResponseBody = { message: string } | { error: string };

const saveSessionHandler: RequestHandler<{}, SaveSessionResponseBody, SaveSessionRequestBody> = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        console.log("saving session");
        const userId = authorize(token);
        if (!userId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const { sessionData } = req.body;
        console.log("Session data to save:", sessionData);
        if (!sessionData || !sessionData.message) {
            console.error("Invalid session data:", sessionData);
            res.status(400).json({ error: "Invalid session data" });
            return;
        }

        const connection = await initConnection();
        console.log("sessionData.uId:", sessionData.uId);

        const [result] = await connection.execute(
            'INSERT IGNORE INTO chat_sessions (u_id, id, user_id, session_name) VALUES (?, ?, ?, ?)',
            [sessionData.uId, sessionData.id, userId, sessionData.sessionName]
        );
        console.log("inserted new session that did not exist");


        await connection.execute(
            'INSERT INTO chat_messages (session_id, msg_index, user_id, sender, message) VALUES (?, ?, ?, ?, ?)',
            [sessionData.uId, sessionData.message.index, userId, sessionData.message.role, sessionData.message.content]
        );


        await connection.end();
        res.status(201).json({ message: "Session saved" });
    } catch (error) {
        console.error("Error saving session:", error);
        res.status(500).json({ error: "Unable to save session" });
    }
};

router.post("/saveSession", saveSessionHandler);

interface GetSessionsResponseBody {
    sessions?: any[];
    error?: string;
}

const getSessionsHandler: RequestHandler<{}, GetSessionsResponseBody> = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const userId = authorize(token);

        const connection = await initConnection();
        const [sessions] = await connection.execute(
            'SELECT u_id, id, session_name FROM chat_sessions WHERE user_id = ? ORDER BY created_at DESC',
            [userId]
        );
        console.log("Sessions:", sessions);
        if (!sessions || (sessions as any[]).length === 0) {
            await connection.end();
            res.json({ sessions: [] });
            return;
        }

        const sessionIds = (sessions as any[]).map(session => session.u_id);
        console.log("Session IDs:", sessionIds);
        const placeholders = sessionIds.map(() => '?').join(', ');

        const [messages] = await connection.execute(
            `SELECT session_id, msg_index, sender, message, created_at
             FROM chat_messages 
             WHERE session_id IN (${placeholders}) 
             ORDER BY msg_index ASC`,
            sessionIds
        );
        console.log("Messages:", messages);
        const sessionsWithMessages = (sessions as any[]).map(rawSession => {
            const sessionMessages = (messages as any[]).filter(message => message.session_id === rawSession.u_id);
            const session = {
                id: rawSession.id,
                uId: rawSession.u_id,
                sessionName: rawSession.session_name
            }
            return {
                ...session,
                messages: sessionMessages.map(message => ({
                    role: message.sender,
                    content: message.message,
                    index: message.msg_index
                }))
            };
        });
        console.log("Sessions with messages:", JSON.stringify(sessionsWithMessages));
        await connection.end();
        res.status(200).json({ sessions: sessionsWithMessages });
    } catch (error) {
        console.error("Error retrieving sessions:", error);
        res.status(500).json({ error: "Unable to retrieve sessions" });
    }
};

router.get("/getSessions", getSessionsHandler);

interface DeleteSessionRequestBody {
    sessionId: string;
}
type DeleteSessionResponseBody = { message: string } | { error: string };

const deleteSessionHandler: RequestHandler<{}, DeleteSessionResponseBody, DeleteSessionRequestBody> = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const userId = authorize(token);
        if (!userId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const { sessionId } = req.body;
        if (!sessionId) {
            res.status(400).json({ error: "Invalid session ID" });
            return;
        }

        const connection = await initConnection();
        await connection.execute('DELETE FROM chat_messages WHERE session_id = ?', [sessionId]);
        await connection.execute('DELETE FROM chat_sessions WHERE u_id = ?', [sessionId]);
        await connection.end();

        res.status(200).json({ message: "Session deleted" });
    } catch (error) {
        console.error("Error deleting session:", error);
        res.status(500).json({ error: "Unable to delete session" });
    }
};

router.post("/deleteSession", deleteSessionHandler);

export default router;

