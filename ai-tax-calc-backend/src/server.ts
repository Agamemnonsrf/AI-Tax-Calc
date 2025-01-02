import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import { BusinessTaxFormData, calculateBusinessTax, calculateTax, TaxFormData } from "./util"
import OpenAI from "openai";
import dotenv from "dotenv";
import { type } from "os";
// Load environment variables from .env file
dotenv.config();

// Create an Express app
const app: Application = express();

// Middleware
app.use(cors())
app.use(express.json()); // Parse JSON bodies

// Example route
app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to the TypeScript Express server!");
});

app.post("/calculate-tax", (req: Request, res: Response) => {
    const formData: TaxFormData = req.body;
    const result = calculateTax(formData);
    res.json(result);
});

app.post("/calculate-business-tax", (req: Request, res: Response) => {
    const formData: BusinessTaxFormData = req.body;
    const result = calculateBusinessTax(formData);
    res.json(result);
});

type Payload = {
    question: string;
    history: OpenAI.Chat.Completions.ChatCompletionMessageParam[];
}

app.post("/tax-advice", async (req: Request, res: Response) => {
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

// Error handling middleware (optional)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});