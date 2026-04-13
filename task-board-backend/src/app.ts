import express from "express";
import cors from "cors";
import taskRoutes from "./modules/task/task.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/tasks", taskRoutes);
export default app;
