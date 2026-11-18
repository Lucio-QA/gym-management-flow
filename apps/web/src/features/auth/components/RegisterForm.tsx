import React from "react";
import { DESIGN_TOKENS } from "../../../styles/tokens.js";
import { useAuthForm } from "../hooks/useAuthForm.js";
import { authService } from "../services/auth.service.js";
import type { RegisterCredentials } from "../types/auth.types.js";

const INITIAL_STATE: RegisterCredentials = {
    email: "",
    password: "",
};

export const RegisterForm: React.FC = () => {
    const { formData, error, isLoading, handleChange, handleSubmit } =
        useAuthForm<RegisterCredentials>(INITIAL_STATE, authService.register);

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="p-3 bg-red-100 border-2 border-black text-sm font-bold text-red-700">
                    {error}
                </div>
            )}

            <div>
                <label className="block text-sm font-bold mb-1">
                    Correo Electrónico
                </label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="admin@gym.com"
                />
            </div>

            <div>
                <label className="block text-sm font-bold mb-1">Contraseña</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="••••••••"
                />
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 font-bold bg-black text-white border-2 border-black ${DESIGN_TOKENS.shadows.hardSm} hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[0px] active:translate-y-[0px] transition-all cursor-pointer disabled:opacity-50`}
            >
                {isLoading ? "Registrando..." : "Crear Cuenta"}
            </button>
        </form>
    );
};