import { User } from "@prisma/client";

// Reexportamos o tipamos usando directamente el modelo de Prisma
export type { User };

export interface CreateUserDTO {
    email: string;
    name?: string;
}

export interface UpdateUserDTO {
    name?: string;
    email?: string;
}