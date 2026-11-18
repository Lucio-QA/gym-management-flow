import React from "react";
import { useNavigate } from "react-router-dom";
import { DESIGN_TOKENS } from "../../../styles/tokens.js";
import { LoginForm } from "../components/LoginForm.js";

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#f4f4f5]">
            <div
                className={`w-full max-w-md bg-white border-2 border-black p-8 ${DESIGN_TOKENS.shadows.hard}`}
            >
                <div className="mb-8 text-center">
                    <h2 className="text-2xl font-black tracking-tight">
                        Bienvenido de nuevo
                    </h2>
                    <p className="text-sm text-zinc-600 font-medium mt-1">
                        Ingresa a tu panel de control
                    </p>
                </div>

                {/* Componente del formulario modularizado */}
                <LoginForm />

                <div className="mt-6 text-center">
                    <button
                        onClick={() => navigate("/")}
                        className="text-sm font-bold text-zinc-600 hover:underline cursor-pointer"
                    >
                        ← Volver a la página principal
                    </button>
                </div>
            </div>
        </div>
    );
};