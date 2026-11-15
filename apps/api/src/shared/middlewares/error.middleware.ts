import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/app.error.js";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message,
        });
    }

    console.error("❌ ERROR NO CONTROLADO:", err);
    return res.status(500).json({
        status: "error",
        message: "Error interno del servidor",
    });
}