import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';

// Instancia centralizada de Axios apuntando al backend del gimnasio
export const apiClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});


// Interceptor de peticiones: Inyecta el token JWT automáticamente si existe
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("gym_token");
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor de respuestas: Manejo global de errores de autenticación
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expirado o inválido: limpiar almacenamiento y redirigir al login
            localStorage.removeItem("gym_token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);