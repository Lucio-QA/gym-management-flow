import axios from "axios";

export const apiClient = axios.create({
    baseURL: "http://localhost:4000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor opcional para inyectar el token JWT automáticamente en las peticiones protegidas
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("gym_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);