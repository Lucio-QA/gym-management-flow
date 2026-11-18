import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DESIGN_TOKENS } from "../../../styles/tokens.js";
import { authService } from "../services/auth.service.js";

export const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const token = await authService.login({ email, password });
            localStorage.setItem("gym_token", token);
            navigate("/dashboard");
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                "Error al iniciar sesión. Verifique sus credenciales."
            );
        } finally {
            setLoading(false);
        }
    };

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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="admin@gym.com"
                />
            </div>

            <div>
                <label className="block text-sm font-bold mb-1">Contraseña</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="••••••••"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 font-bold bg-black text-white border-2 border-black ${DESIGN_TOKENS.shadows.hardSm} hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[0px] active:translate-y-[0px] transition-all cursor-pointer disabled:opacity-50`}
            >
                {loading ? "Autenticando..." : "Ingresar"}
            </button>
        </form>
    );
};