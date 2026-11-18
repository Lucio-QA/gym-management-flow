export interface LoginCredentials {
    email: string;
    password: string;
    [key: string]: string; // Índice de firma para satisfacer Record<string, string>
}

export interface RegisterCredentials {
    email: string;
    password: string;
    name?: string;
    [key: string]: string | undefined; // Permite opcionales con índice tipado
}

export interface AuthResponse {
    success: boolean;
    message: string;
    data: {
        token: string;
        user?: {
            id: string;
            email: string;
        };
    };
}