import React from "react";
import ReactMarkdown from "react-markdown";
import CtaButton from "../ui-components/cta-button";
import { faPaperPlane, faTrash } from "@fortawesome/free-solid-svg-icons";
import type { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import type { Chat, ChatSession } from "./useChat";
import useChat from "./useChat";
import Tooltip from "../ui-components/tooltip";
import ChatSessions from "./chat-sessions";
import Dialog from "../ui-components/dialog";


interface ChatWindowProps {
    chat: Chat;
    error: string | null;
    question: string;
    setQuestion: (value: string) => void;
    handleSend: (length: number) => void;
    currentSessionId: number;
    chatSessions: ChatSession[];
    loading: boolean;
    handleDeleteSession: () => void;
}

const sampleQuestions = [
    "What tax deductions and credits am I eligible for this year, and how can I maximize them?",
    "How can I structure my investments to minimize capital gains taxes in the long term?",
    "What are the tax implications of starting my own business, and what expenses can I deduct?",
    "Can you help me understand the differences between tax-deferred, tax-exempt, and taxable accounts, and which ones should I prioritize?",
    "How can I legally reduce my taxable income through retirement planning or other tax-advantaged accounts?",
    "What steps should I take if I believe I may owe more in taxes than I can afford to pay?"
]

const ChatWindow: React.FC<ChatWindowProps> = ({
    chat,
    error,
    question,
    setQuestion,
    handleSend,
    handleDeleteSession,
    loading,
    chatSessions,
}) => {

    const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);

    return (
        <>
            <Dialog isOpen={showDeleteDialog} title={`Do you really want to delete your current Chat Session?`} onConfirm={handleDeleteSession} onCancel={() => setShowDeleteDialog(false)} />
            <div className="h-full w-full flex flex-col bg-gray-100 rounded-e-xl text-white z-0">
                <div className="w-full h-full flex flex-col relative">
                    <div className="w-full h-16 bg-white p-2 rounded-se-lg text-black flex items-center justify-end">
                        <div className="flex gap-2">
                            <CtaButton disabled={chatSessions.length <= 1} text="Delete Session" size="sm" isDestructive icon={faTrash} onClick={() => setShowDeleteDialog(true)} />
                        </div>
                    </div>
                    <div className="flex-1 p-2 overflow-y-auto w-full flex h-full md:h-auto flex-col pb-32 px-4">
                        {loading
                            ? <></>
                            : <>{chat.messages.map((chatItem, index) => (
                                <div key={index} className={`mb-2 p-3 max-w-screen-sm rounded ${chatItem.role === "user" ? "bg-purple-600 text-white self-end" : chatItem.content === "loading" ? "bg-neutral-800 text-gray-200 self-start" : "bg-neutral-800 text-stone-200 self-start"}`}>
                                    {chatItem.content === "loading" ? (
                                        <div className="flex items-center">
                                            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                            </svg>
                                            <span className="italic text-xs">Loading Response...</span>
                                        </div>
                                    ) : (
                                        typeof chatItem.content === "string" ? (
                                            <ReactMarkdown>{chatItem.content}</ReactMarkdown>
                                        ) : (
                                            JSON.stringify(chatItem.content)
                                        )
                                    )}
                                </div>
                            ))}
                                {error && (
                                    <p className="text-red-500 text-xs italic">{error}</p>
                                )}
                            </>
                        }</div>
                    {chat.messages.length <= 2 && <div className="w-full mb-24 md:mb-16 px-2 flex gap-1 overflow-x-scroll overflow-y-hidden absolute bottom-0">
                        {sampleQuestions.map((sampleQuestion, index) => (
                            <div key={index} className="p-2 m-2 rounded-xl bg-black min-w-80 flex items-center justify-center text-xs text-neutral-200 cursor-pointer hover:bg-neutral-800" onClick={() => setQuestion(sampleQuestion)}>
                                {sampleQuestion}
                            </div>
                        ))}
                    </div>}
                    <div className="flex w-full h-24 md:h-16">
                        <textarea
                            placeholder="Enter your question here"
                            className="w-full h-full p-2 bg-white text-black text-sm outline-none resize-none"
                            value={question}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSend(chat.messages.length);
                                }
                            }}
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                        <div className="w-1/4 flex items-center justify-center">
                            <CtaButton text="Send" onClick={() => handleSend(chat.messages.length)} size="sm" icon={faPaperPlane} widthType="custom" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatWindow;
