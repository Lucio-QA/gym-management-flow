import { useState } from "react";
import { authService } from "../services/auth.service";
import type { LoginCredentials, RegisterCredentials } from "../types/auth.types";

interface UseAuthFormProps {
    mode: "login" | "register";
    onSuccess?: () => void;
}

export function useAuthForm({ mode, onSuccess }: UseAuthFormProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            let token: string;

            if (mode === "login") {
                const credentials: LoginCredentials = { email, password };
                token = await authService.login(credentials);
            } else {
                const credentials: RegisterCredentials = { email, password, name: name.trim() ? name : undefined };
                token = await authService.register(credentials);
            }

            // Guardar token en localStorage
            localStorage.setItem("gym_token", token);

            // Callback de éxito o redirección
            if (onSuccess) {
                onSuccess();
            } else {
                window.location.href = "/dashboard";
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Ocurrió un error inesperado durante la autenticación.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        name,
        setName,
        isLoading,
        error,
        handleSubmit,
    };
}