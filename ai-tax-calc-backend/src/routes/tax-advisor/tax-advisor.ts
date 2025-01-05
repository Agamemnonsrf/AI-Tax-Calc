import express, { Request, Response } from 'express';
import OpenAI from 'openai';

const router = express.Router();

type Payload = {
    question: string;
    history: OpenAI.Chat.Completions.ChatCompletionMessageParam[];
}


router.post("/tax-advice", async (req: Request, res: Response) => {
    const payload: Payload = req.body;
    console.log(payload.question);
    console.log(process.env.OPENAI_API_KEY);
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
    })
    res.json({ answer: competion.choices[0].message.content });
});

export default router;

