import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../config/prisma.js";
import { AppError } from "../../shared/errors/app.error.js";
import { AuthResponseDTO, LoginDTO, RegisterDTO } from "./auth.interfaces.js";

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_dev_key";
const JWT_EXPIRES_IN = "1d";

export class AuthService {

    /**
   * Registra un nuevo usuario aplicando hashing de contraseña
   */
    async register(data: RegisterDTO): Promise<AuthResponseDTO> {
        const normalizedEmail = data.email.trim().toLowerCase();

        // 1. Verificar si el usuario ya existe
        const existingUser = await prisma.user.findUnique({
            where: { email: normalizedEmail },
        });

        if (existingUser) {
            throw new AppError("El correo electrónico ya se encuentra registrado", 409);
        }

        // 2. Aplicar Hashing a la contraseña (10 salt rounds)
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(data.password, saltRounds);

        // 3. Crear el usuario en la base de datos
        const newUser = await prisma.user.create({
            data: {
                email: normalizedEmail,
                passwordHash,
                name: data.name,
            },
        });

        // 4. Generar Token JWT
        const token = jwt.sign({ userId: newUser.id, email: newUser.email }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        });

        // 5. Excluir passwordHash de la respuesta
        const { passwordHash: _, ...userWithoutPassword } = newUser;

        return {
            user: userWithoutPassword,
            token,
        };
    }

    /**
   * Valida credenciales e inicia sesión
   */
    async login(data: LoginDTO): Promise<AuthResponseDTO> {
        const normalizedEmail = data.email.trim().toLowerCase();

        // 1. Buscar usuario por email
        const user = await prisma.user.findUnique({
            where: { email: normalizedEmail },
        });

        if (!user) {
            throw new AppError("Credenciales inválidas", 401);
        }

        // 2. Comparar contraseña ingresada con el hash guardado
        const isPasswordValid = await bcrypt.compare(data.password, user.passwordHash);

        if (!isPasswordValid) {
            throw new AppError("Credenciales inválidas", 401);
        }

        // 3. Generar Token JWT
        const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        });

        // 4. Excluir passwordHash de la respuesta
        const { passwordHash: _, ...userWithoutPassword } = user;

        return {
            user: userWithoutPassword,
            token,
        };
    }
}