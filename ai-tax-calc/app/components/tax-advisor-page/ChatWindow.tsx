import React from "react";
import ReactMarkdown from "react-markdown";

interface ChatWindowProps {
    chat: any[];
    error: string | null;
    question: string;
    setQuestion: (value: string) => void;
    handleSend: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
    chat,
    error,
    question,
    setQuestion,
    handleSend,
}) => {
    return (
        <div className="w-3/4 h-full flex flex-col items-center justify-center text-white p-4">
            <h1 className="text-2xl mb-4">Tax Advisor</h1>
            <div className="w-full max-w-md bg-gray-800 p-4 rounded-lg flex flex-col space-y-4 h-2/3">
                <div className="flex-1 overflow-y-auto">
                    {chat.map((chatItem, index) => (
                        <div key={index} className={`mb-2 p-2 rounded ${chatItem.role === "user" ? "bg-blue-500 text-white self-end" : chatItem.content === "loading" ? "bg-gray-700 text-white self-start" : "bg-gray-700 text-white self-start"}`}>
                            {chatItem.content === "loading" ? (
                                <div className="flex items-center">
                                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                    </svg>
                                    <span>Loading...</span>
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
                        <div className="mb-2 p-2 rounded bg-red-500 text-white self-start">
                            {error}
                        </div>
                    )}
                </div>
                <div className="flex space-x-2">
                    <input
                        type="text"
                        placeholder="Enter your question here"
                        className="flex-1 p-2 bg-white text-black rounded"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                    <button
                        className="p-2 bg-blue-500 text-white rounded"
                        onClick={handleSend}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatWindow;
