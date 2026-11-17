import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// Interfaz para la carga útil (payload) del JWT
export interface JwtPayload {
    userId: string;
    email: string;
    role?: string;
}

export const authenticateToken = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Formato: "Bearer TOKEN"

    if (!token) {
        res.status(401).json({
            success: false,
            message: "Acceso denegado. Token no proporcionado.",
        });
        return;
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
        res.status(500).json({
            success: false,
            message: "Error interno: JWT_SECRET no está configurado en el servidor.",
        });
        return;
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            res.status(403).json({
                success: false,
                message: "Token inválido o expirado.",
            });
            return;
        }

        // Inyectamos los datos del usuario en req.user
        req.user = decoded as JwtPayload;
        next();
    });
};