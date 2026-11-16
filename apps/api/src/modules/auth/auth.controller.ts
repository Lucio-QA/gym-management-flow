import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service.js";


const authService = new AuthService;

export class AuthController {
    async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await authService.register(req.body);
            res.status(201).json({
                success: true,
                message: "Usuario registrado correctamente.",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await authService.login(req.body);
            res.status(200).json({
                success: true,
                message: "Inicio de sesión exitoso",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }
}