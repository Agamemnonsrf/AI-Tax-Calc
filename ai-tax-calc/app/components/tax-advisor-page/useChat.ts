import { useState, useEffect } from "react";
import { OpenAI } from "openai";

const useChat = () => {
    const [question, setQuestion] = useState<string>("");
    const [chat, setChat] = useState<OpenAI.Chat.Completions.ChatCompletionMessageParam[]>([]);
    const [chatSessions, setChatSessions] = useState<{ id: number, messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] }[]>([]);
    const [currentSessionId, setCurrentSessionId] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [simulateError, setSimulateError] = useState<boolean>(false);

    useEffect(() => {
        if (currentSessionId !== null) {
            setChatSessions((prevSessions) =>
                prevSessions.map((session) =>
                    session.id === currentSessionId
                        ? { ...session, messages: chat }
                        : session
                )
            );
        }
    }, [chat]);

    const handleSend = async () => {
        if (currentSessionId === null) {
            handleFirstSession();
        }
        const recentChat = chat.slice(-9);
        const payload = {
            question,
            history: [...recentChat, { role: "user", content: question }],
        };
        setChat([...chat, { role: "user", content: question }, { role: "system", content: "loading" }]);
        setError(null);
        try {
            if (simulateError) {
                throw new Error("Simulated error");
            }
            const response = await fetch("http://localhost:5000/tax-advice", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            setChat((prevChat) => [
                ...prevChat.slice(0, -1),
                { role: "system", content: data.answer },
            ]);
        } catch (err) {
            setChat((prevChat) => prevChat.slice(0, -1));
            setError(`Sorry, there has been an error (${err})`);
            console.log(err);
        }
        setQuestion("");
        setSimulateError(false);
    };

    const handleFirstSession = () => {
        const firstSessionId = 1;
        setChatSessions([{
            id: firstSessionId, messages: [
                { role: "user", content: question },
            ]
        }]);
        setCurrentSessionId(firstSessionId);
    }

    const handleNewSession = () => {
        const newSessionId = chatSessions.length + 1;
        setChatSessions([...chatSessions, { id: newSessionId, messages: [] }]);
        setCurrentSessionId(newSessionId);
        setChat([]);
    };

    const handleSessionClick = (sessionId: number) => {
        const session = chatSessions.find(session => session.id === sessionId);
        if (session && sessionId !== currentSessionId) {
            setCurrentSessionId(sessionId);
            setChat(session.messages);
        }
    };

    useEffect(() => {
        console.log(chatSessions)
    }, [chatSessions]);

    return {
        question,
        setQuestion,
        chat,
        chatSessions,
        currentSessionId,
        error,
        handleSend,
        handleNewSession,
        handleSessionClick,
        setSimulateError,
    };
};

export default useChat;
