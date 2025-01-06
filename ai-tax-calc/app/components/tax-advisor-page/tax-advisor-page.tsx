import React from "react";
import ChatSessions from "./chat-sessions";
import ChatWindow from "./chat-window";
import useChat from "./useChat"
import Tooltip from "../ui-components/tooltip";
import useAuth from "~/hooks/useAuth";
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
        handleDeleteSession,
        handleSessionClick,
        setSimulateError,
        loading
    } = useChat();

    const { isLoggedIn } = useAuth();

    return (
        <main className="h-svh bg-black">
            <div className="space-y-10 px-0 py-5 md:p-5 flex flex-col">
                <div className="mt-16 md:mt-5"></div>
                <h2 className="text-5xl md:text-6xl font-extrabold text-white">Tax Advisor</h2>
                <Tooltip text={`Ask your tax related questions here and get answers from our AI Tax Advisor.`} secondaryText={!isLoggedIn ? "Your chat sessions are currently not being saved, sign in to save and access them with your account." : ""} size="sm" />
                <div className="flex flex-col md:flex-row bg-white md:rounded-xl w-full md:w-2/3 h-screen md:h-[calc(100svh_-_200px)] self-center">
                    <ChatSessions
                        chatSessions={chatSessions}
                        currentSessionId={currentSessionId}
                        handleNewSession={handleNewSession}
                        handleSessionClick={handleSessionClick}
                        setSimulateError={setSimulateError}
                        sessionError={error}
                        loading={loading}
                    />
                    <ChatWindow
                        chat={chat}
                        error={error}
                        question={question}
                        setQuestion={setQuestion}
                        handleSend={handleSend}
                        currentSessionId={currentSessionId}
                        chatSessions={chatSessions}
                        loading={loading}
                        handleDeleteSession={handleDeleteSession}
                    />
                </div>
            </div>
        </main>
    );
};

export default TaxAdvisorPage;