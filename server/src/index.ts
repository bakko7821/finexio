import { PrismaClient } from '@prisma/client';
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);

const prisma = new PrismaClient();

async function startServer() {
    try {
        await prisma.$connect();
        console.log("Connected to PostgreSQL via Prisma");

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Server start failed:", error);
        process.exit(1);
    }
}

startServer();
