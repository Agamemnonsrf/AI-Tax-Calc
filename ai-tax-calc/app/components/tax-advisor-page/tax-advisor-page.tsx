import React from "react";
import ChatSessions from "./ChatSessions";
import ChatWindow from "./ChatWindow";
import useChat from "./useChat"
const TaxAdvisorPage: React.FC = () => {
    const {
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
    } = useChat();

    return (
        <div className="h-screen bg-slate-950 flex">
            <ChatSessions
                chatSessions={chatSessions}
                currentSessionId={currentSessionId}
                handleNewSession={handleNewSession}
                handleSessionClick={handleSessionClick}
                setSimulateError={setSimulateError}
            />
            <ChatWindow
                chat={chat}
                error={error}
                question={question}
                setQuestion={setQuestion}
                handleSend={handleSend}
            />
        </div>
    );
};

export default TaxAdvisorPage;