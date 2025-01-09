import { useState, useEffect } from "react";
import { OpenAI } from "openai";
import useAuth from "~/hooks/useAuth";

import { v4 as uuidv4 } from 'uuid';

export type ChatSession = {
    id: number;
    uId: string;
    messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[];
    sessionName: string;
};

export type SqlChatSession = {
    id: number;
    uId: string;
    message: { role: string, content: string, index: number };
    sessionName: string;
}

export type Chat = {
    messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[];
    sessionId: number;
}

const useChat = () => {
    const [question, setQuestion] = useState<string>("");
    const [chat, setChat] = useState<Chat>({
        messages: [
            { role: "system", content: "Welcome! How can I help you today?" },
        ], sessionId: 1
    });
    const [chatSessions, setChatSessions] = useState<ChatSession[]>([{
        id: 1, uId: uuidv4(), messages: chat.messages, sessionName: "Session 1"
    }]);
    const [currentSessionId, setCurrentSessionId] = useState<number>(1);
    const [error, setError] = useState<string | null>(null);
    const [simulateError, setSimulateError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [sessionError, setSessionError] = useState<string | null>(null);
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        setChatSessions((prevSessions) =>
            prevSessions.map((session) =>
                session.id === currentSessionId
                    ? { ...session, messages: chat.messages }
                    : session
            )
        );
    }, [chat]);

    useEffect(() => {
        if (isLoggedIn) {
            setLoading(true);
            (async () => {
                try {
                    const token = localStorage.getItem("token");
                    const res = await fetch("http://localhost:5000/tax-advisor/getSessions", {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    const data = await res.json();
                    if (data.sessions.length !== 0) {
                        setChatSessions(() => {
                            return data.sessions.map((session: ChatSession) => {
                                return {
                                    id: session.id,
                                    uId: session.uId,
                                    messages: [{ role: "system", content: "Welcome! How can I help you today?" }, ...session.messages],
                                    sessionName: session.sessionName
                                }
                            })
                        });
                        setCurrentSessionId(data.sessions[0].id);
                        setChat({ messages: [{ role: "system", content: "Welcome! How can I help you today?" }, ...data.sessions[0].messages], sessionId: data.sessions[0].id });
                    }
                } catch (err) {
                    console.error(err);
                    setSessionError("Error fetching sessions");
                } finally {
                    setLoading(false);
                }
            })();
        }
    }, [isLoggedIn]);

    const handleDeleteSession = async () => {
        if (!isLoggedIn) {
            const currentSession = chatSessions.find(session => session.id === currentSessionId);
            setChatSessions((prevSessions) => {
                const newSessions = prevSessions.filter((session) => session.id !== currentSession?.id);
                setCurrentSessionId(newSessions[0].id);
                setChat({ messages: newSessions[0].messages, sessionId: newSessions[0].id });
                return newSessions;
            });
            return;
        }
        try {
            const currentSession = chatSessions.find(session => session.id === currentSessionId);
            const token = localStorage.getItem("token");
            await fetch("http://localhost:5000/tax-advisor/deleteSession", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ sessionId: currentSession?.uId }),
            });
            setChatSessions((prevSessions) => {
                const newSessions = prevSessions.filter((session) => session.id !== currentSession?.id);
                setCurrentSessionId(newSessions[0].id);
                setChat({ messages: newSessions[0].messages, sessionId: newSessions[0].id });
                return newSessions;
            });
        } catch (err) {
            console.error(err);
            setSessionError("Error deleting session");
        }
    }

    const saveSession = async (session: SqlChatSession) => {
        console.log("saving session", session);
        try {
            const token = localStorage.getItem("token");
            await fetch("http://localhost:5000/tax-advisor/saveSession", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ sessionData: session }),
            });
        } catch (err) {
            console.error(err);
            setSessionError("Error saving session");
        }
    }

    const handleSend = async (length: number) => {
        const session = chatSessions.find(session => session.id === currentSessionId);
        if (!session || question === "") {
            return;
        }
        const recentChat = chat.messages.slice(-9);
        const payload = {
            question,
            history: [...recentChat, { role: "user", content: question }],
        };
        setChat((prevChat) => {
            return { messages: [...chat.messages, { role: "user", content: question }, { role: "system", content: "loading" }], sessionId: prevChat.sessionId }
        });

        saveSession({ id: currentSessionId, uId: session.uId, message: { role: "user", content: question, index: length }, sessionName: `Session ${currentSessionId}` });
        setError(null);
        try {
            if (simulateError) {
                throw new Error("Simulated error");
            }
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:5000/tax-advisor/tax-advice", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            setChat((prevChat) => {
                return {
                    messages: [
                        ...prevChat.messages.slice(0, -1),
                        { role: "system", content: data.answer },
                    ], sessionId: prevChat.sessionId
                }
            });
            await saveSession({ id: currentSessionId, uId: session.uId, message: { role: "system", content: data.answer, index: length + 1 }, sessionName: `Session ${currentSessionId}` });
        } catch (err) {
            setError(`Sorry, there has been an error (${err})`);
            setLoading(false);
            setTimeout(() => {
                setChat((prevChat) => {
                    return {
                        messages: [
                            ...prevChat.messages.slice(0, -1),
                        ], sessionId: prevChat.sessionId
                    }
                });
            }, 2000);
            console.log(err);
        }
        setQuestion("");
        setSimulateError(false);
    };

    const handleNewSession = () => {
        //newSessionId should be the highest id + 1
        const newSessionId = chatSessions.reduce((acc, session) => {
            return session.id > acc ? session.id : acc;
        }, 0) + 1;
        setChatSessions([...chatSessions, {
            id: newSessionId, uId: uuidv4(), messages: [
                { role: "system", content: "Welcome! How can I help you today?" },
            ], sessionName: `Session ${newSessionId}`
        }]);
        setCurrentSessionId(newSessionId);
        setChat(() => {
            return {
                messages: [
                    { role: "system", content: "Welcome! How can I help you today?" },
                ], sessionId: newSessionId
            }
        });
    };

    const handleSessionClick = (sessionId: number) => {
        const session = chatSessions.find(session => session.id === sessionId);
        if (session && sessionId !== currentSessionId) {
            setCurrentSessionId(sessionId);
            setChat({ messages: session.messages, sessionId });
        }
    };

    useEffect(() => {
        console.log("currentSessionId", currentSessionId);
    }, [currentSessionId]);

    return {
        question,
        setQuestion,
        chat,
        chatSessions,
        currentSessionId,
        error,
        handleSend,
        handleNewSession,
        handleDeleteSession,
        handleSessionClick,
        setSimulateError,
        loading,
        sessionError,
    };
};

export default useChat;
