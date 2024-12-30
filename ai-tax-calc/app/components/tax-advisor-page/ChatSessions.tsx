import React from "react";

interface ChatSessionsProps {
    chatSessions: { id: number, messages: any[] }[];
    currentSessionId: number | null;
    handleNewSession: () => void;
    handleSessionClick: (sessionId: number) => void;
    setSimulateError: (value: boolean) => void;
}

const ChatSessions: React.FC<ChatSessionsProps> = ({
    chatSessions,
    currentSessionId,
    handleNewSession,
    handleSessionClick,
    setSimulateError,
}) => {
    return (
        <div className="w-1/4 bg-gray-800 p-4">
            <h2 className="text-xl mb-4">Chat Sessions</h2>
            <button
                className="w-full p-2 mb-4 bg-blue-500 text-white rounded"
                onClick={handleNewSession}
            >
                New Session
            </button>
            <button
                className="w-full p-2 mb-4 bg-red-500 text-white rounded"
                onClick={() => setSimulateError(true)}
            >
                Simulate Error
            </button>
            <div className="space-y-2">
                {chatSessions.map(session => (
                    <div
                        key={session.id}
                        className={`p-2 rounded cursor-pointer ${session.id === currentSessionId ? "bg-blue-500 text-white" : "bg-gray-700 text-white"}`}
                        onClick={() => handleSessionClick(session.id)}
                    >
                        Session {session.id}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatSessions;
