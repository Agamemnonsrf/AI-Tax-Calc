"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const util_1 = require("./util");
const openai_1 = __importDefault(require("openai"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
// Create an Express app
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json()); // Parse JSON bodies
// Example route
app.get("/", (req, res) => {
    res.send("Welcome to the TypeScript Express server!");
});
app.post("/calculate-tax", (req, res) => {
    const formData = req.body;
    const result = (0, util_1.calculateTax)(formData);
    res.json(result);
});
app.post("/tax-advice", async (req, res) => {
    const payload = req.body;
    console.log(payload.question);
    console.log(process.env.OPENAI_API_KEY);
    const openai = new openai_1.default({ apiKey: process.env.OPENAI_API_KEY });
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
    });
    res.json({ answer: competion.choices[0].message.content });
});
// Error handling middleware (optional)
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
});
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
