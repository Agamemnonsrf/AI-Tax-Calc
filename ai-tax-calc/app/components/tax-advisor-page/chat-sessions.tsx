import React from "react";
import CtaButton from "../ui-components/cta-button";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import useAuth from "~/hooks/useAuth";
import type { ChatSession } from "./useChat";


interface ChatSessionsProps {
    chatSessions: ChatSession[];
    currentSessionId: number | null;
    handleNewSession: () => void;
    handleSessionClick: (sessionId: number) => void;
    setSimulateError: (value: boolean) => void;
    loading: boolean;
    sessionError: string | null;
}

const ChatSessions: React.FC<ChatSessionsProps> = ({
    chatSessions,
    currentSessionId,
    handleNewSession,
    handleSessionClick,
    setSimulateError,
    loading,
    sessionError,
}) => {
    const { isLoggedIn } = useAuth();
    console.log(chatSessions)
    return (
        <div className="w-full h-52 md:h-auto md:w-1/4 text-black flex flex-col bg-white md:rounded-s-xl z-10">
            <h2 className="text-lg font-light m-4 self-center text-gray-700">Chat Sessions</h2>
            <div className="w-full flex justify-center">
                <CtaButton text="New Session" onClick={handleNewSession} widthType="auto" size={"sm"} icon={faPenToSquare} />
            </div>
            {/* <CtaButton text="Simulate Error" onClick={() => setSimulateError(true)} widthType="full" /> */}
            <div className="overflow-y-auto flex flex-row gap-3 md:gap-0 md:flex-col px-2">
                {isLoggedIn && sessionError ? (
                    <div className="flex items-center justify-center h-full">
                        <p>{sessionError}</p>
                    </div>
                ) : isLoggedIn && loading ? (
                    <div className="flex items-center justify-center h-full">
                        <p>Loading sessions...</p>
                    </div>
                ) : (
                    chatSessions.map(session => (
                        <div
                            key={session.id}
                            className={`p-2 my-2 text-sm rounded-sm min-w-max text-nowrap cursor-pointer ${session.id === currentSessionId ? "bg-purple-600 text-white" : "bg-gray-100 border text-black hover:bg-gray-200"}`}
                            onClick={() => handleSessionClick(session.id)}
                        >
                            {session.sessionName}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ChatSessions;
