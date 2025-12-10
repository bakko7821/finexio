import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { sequelize } from "./config/db";

import authRouters from "./routes/auth";
import transactionsRoutes from "./routes/transactions";
import categoriesRoutes from "./routes/categories";
import usersRoutes from "./routes/users";
// import boardsRoutes from "./routes/boards";
// import columnsRoutes from "./routes/columns";
// import tasksRoutes from "./routes/tasks";
// import tagsRoutes from "./routes/tags";
// import uploadRouter from "./routes/upload";
// import archiveRouter from "./routes/archives";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api/auth", authRouters);
app.use("/api/users", usersRoutes);
app.use("/api/transactions", transactionsRoutes);
app.use("/api/categories", categoriesRoutes);
// app.use("/api/tasks", tasksRoutes);
// app.use("/api/tags", tagsRoutes);
// app.use("/api/upload", uploadRouter);
// app.use("/api/archive", archiveRouter);

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Database connected");

    await sequelize.sync({ alter: true });
    console.log("All Models synchronized");

    console.log("loaded models:", sequelize.models);

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

export { app };
