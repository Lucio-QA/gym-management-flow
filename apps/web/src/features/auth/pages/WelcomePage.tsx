import React from "react";
import { useNavigate } from "react-router-dom";
import { DESIGN_TOKENS } from "../../../styles/tokens.js";

export const WelcomePage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col justify-between p-6 md:p-12 bg-[#f4f4f5]">
            {/* Header Minimalista */}
            <header className="flex justify-between items-center max-w-6xl mx-auto w-full">
                <div className="flex items-center gap-2">
                    <span className="text-xl font-black tracking-tighter bg-black text-white px-3 py-1">
                        GYM
                    </span>
                    <span className="font-bold text-lg">MANAGER</span>
                </div>
                <button
                    onClick={() => navigate("/login")}
                    className={`px-4 py-2 font-semibold bg-white border-2 border-black ${DESIGN_TOKENS.shadows.hardSm} hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer`}
                >
                    Iniciar Sesión
                </button>
            </header>

            {/* Hero Section */}
            <main className="max-w-4xl mx-auto text-center py-16 md:py-24">
                <div className="inline-block bg-emerald-100 border-2 border-black px-4 py-1 text-sm font-bold mb-6 rotate-[-1deg]">
                    ⚡ Plataforma de gestión para gimnasios
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
                    Control total de tu gimnasio, organización y claridad.
                </h1>
                <p className="text-lg md:text-xl text-zinc-600 mb-10 max-w-2xl mx-auto font-medium">
                    Administra clientes, membresías, empleados y finanzas sin preocuparte por el caos administrativo: todo en un solo lugar.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button
                        onClick={() => navigate("/login")}
                        className={`px-8 py-4 font-bold text-lg bg-black text-white border-2 border-black ${DESIGN_TOKENS.shadows.hard} hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-[0px] active:translate-y-[0px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer`}
                    >
                        Acceder al Sistema →
                    </button>
                </div>
            </main>

            {/* Footer */}
            <footer className="text-center text-sm text-zinc-500 font-medium max-w-6xl mx-auto w-full border-t border-zinc-300 pt-6">
                © {new Date().getFullYear()} Gym Management System. Todos los derechos reservados.
            </footer>
        </div>
    );
};