import { Router } from "express";
import { authenticateToken } from "../../shared/middlewares/auth.middleware.js";
import { AuthController } from "./auth.controller.js";

const router = Router();
const authController = new AuthController();

// POST /api/auth/register
router.post("/register", authController.register.bind(authController));

// POST /api/auth/login
router.post("/login", authController.login.bind(authController));

// Ejemplo para obtener el perfil del usuario logueado actualmente
router.get("/me", authenticateToken, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Perfil obtenido exitosamente",
        user: req.user,
    });
});

export const authRoutes = router;