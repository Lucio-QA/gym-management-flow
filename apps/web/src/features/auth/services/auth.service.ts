import axios from "axios";

interface LoginCredentials {
    email: string;
    password: string;
}

interface LoginResponse {
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

export const authService = {
    login: async (credentials: LoginCredentials): Promise<string> => {
        // Apuntamos al endpoint del backend
        const response = await axios.post<LoginResponse>(
            "http://localhost:3000/api/auth/login",
            credentials
        );

        return response.data.data.token;
    },
}
