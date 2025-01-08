import OpenAI from "openai";

export interface DeleteSessionRequestBody {
    sessionId: string;
}
export type DeleteSessionResponseBody = { message: string } | { error: string };

export interface GetSessionsResponseBody {
    sessions?: any[];
    error?: string;
}


export type Message = {
    role: "system" | "user";
    content: string;
    index: number;
};

export type ChatSession = {
    id: number;
    uId: string;
    message: Message;
    sessionName: string;
};

export interface SaveSessionRequestBody {
    sessionData: ChatSession;
}
export type SaveSessionResponseBody = { message: string } | { error: string };

export interface TaxAdviceRequestBody {
    question: string;
    history: OpenAI.Chat.Completions.ChatCompletionMessageParam[];
}
export interface TaxAdviceResponseBody {
    answer?: string;
    error?: string;
}
