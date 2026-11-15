import cors from "cors";
import express, { Application } from "express";
import { errorHandler } from "./shared/middlewares/error.middleware.js";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "El servidor del gimnasio está vivo y operando correctamente 🏋️‍♂️",
    timestamp: new Date().toISOString(),
  });
});

app.use(errorHandler);

export default app;
