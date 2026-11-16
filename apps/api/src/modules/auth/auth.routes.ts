import { Router } from "express";
import { AuthController } from "./auth.controller.js";

const router = Router();
const authController = new AuthController();

// POST /api/auth/register
router.post("/register", authController.register.bind(authController));

// POST /api/auth/login
router.post("/login", authController.login.bind(authController));

export const authRoutes = router;