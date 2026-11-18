import { apiClient } from "../../../services/api.client.js";
import type {
    AuthResponse,
    LoginCredentials,
    RegisterCredentials,
} from "../types/auth.types.js";

export const authService = {
    login: async (credentials: LoginCredentials): Promise<string> => {
        const { data } = await apiClient.post<AuthResponse>(
            "/auth/login",
            credentials
        );
        return data.data.token;
    },

    register: async (credentials: RegisterCredentials): Promise<string> => {
        const { data } = await apiClient.post<AuthResponse>(
            "/auth/register",
            credentials
        );
        return data.data.token;
    },
};