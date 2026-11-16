import { User } from "@prisma/client";


export interface RegisterDTO {
    email: string;
    password: string;
    name?: string;
}

export interface LoginDTO {
    email: string;
    password: string;
}

// Estructura limpia del usuario que se devuelve al cliente (sin password)
export interface AuthResponseDTO {
    user: Omit<User, "passwordHash">;
    token: string;
}