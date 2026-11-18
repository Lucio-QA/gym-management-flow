import { isAxiosError } from "axios";
import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";

interface ApiErrorResponse {
    message?: string;
}

export function useAuthForm<T extends Record<string, string | undefined>>(
    initialState: T,
    onSubmitAction: (data: T) => Promise<string>
) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<T>(initialState);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Usamos el evento genérico limpio compatible con React 19
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const token = await onSubmitAction(formData);
            localStorage.setItem("gym_token", token);
            navigate("/dashboard");
        } catch (err: unknown) {
            if (isAxiosError<ApiErrorResponse>(err)) {
                setError(
                    err.response?.data?.message ||
                    "Error al procesar la solicitud. Intente nuevamente."
                );
            } else {
                setError("Ocurrió un error inesperado.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formData,
        error,
        isLoading,
        handleChange,
        handleSubmit,
    };
}