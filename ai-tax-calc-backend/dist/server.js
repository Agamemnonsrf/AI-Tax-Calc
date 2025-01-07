"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const calculate_tax_1 = __importDefault(require("./routes/calculate-tax/calculate-tax"));
const auth_1 = __importDefault(require("./routes/auth/auth"));
const tax_advisor_1 = __importDefault(require("./routes/tax-advisor/tax-advisor"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = require("./routes/auth/db");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
const envVars = [
    process.env.DB_USER,
    process.env.DB_PASS,
    process.env.DB_NAME,
    process.env.DB_HOST,
    process.env.DB_PORT,
];
//not required, only used for chat and auth
//process.env.DB_SECRET_KEY,
//process.env.OPENAI_API_KEY
if (envVars.some((v) => !v)) {
    console.error("Missing required environment variables. Check your .env file.: ", envVars);
    process.exit(1);
}
app.get("/", (req, res) => {
    res.send("Welcome to the TypeScript Express server!");
});
(async () => {
    await (0, db_1.createUsersTable)();
    await (0, db_1.createChatSessionsTable)();
    await (0, db_1.createChatMessagesTable)();
})();
app.use("/auth", auth_1.default);
app.use("/calculate-tax", calculate_tax_1.default);
app.use("/tax-advisor", tax_advisor_1.default);
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
});
const PORT = process.env.PORT || 5000;
const startServer = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error('Error starting server: ', error);
    }
};
startServer();
