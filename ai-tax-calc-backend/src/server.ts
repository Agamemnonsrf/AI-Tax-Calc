import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
import calculateTaxRoutes from "./routes/calculate-tax/calculate-tax";
import authRoutes from "./routes/auth/auth";
import taxAdvisorRoutes from "./routes/tax-advisor/tax-advisor";
import bodyParser from "body-parser";
import { createUsersTable } from "./routes/auth/db";

dotenv.config();

const app: Application = express();

app.use(cors())
app.use(bodyParser.json());

const envVars = [
    process.env.DB_USER,
    process.env.DB_PASS,
    process.env.DB_NAME,
    process.env.DB_HOST,
    process.env.DB_PORT,
    process.env.DB_SECRET_KEY,
    process.env.OPENAI_API_KEY
];


if (envVars.some((v) => !v)) {
    console.error("Missing required environment variables. Check your .env file.");
    process.exit(1);
}

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to the TypeScript Express server!");
});



createUsersTable();

app.use("/auth", authRoutes)

app.use("/calculate-tax", calculateTaxRoutes);

app.use("/tax-advisor", taxAdvisorRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server: ', error);
    }
}

startServer();
