import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryProvider } from "../providers/QueryProvider.js";

// Componente temporal de Guardia de Rutas Privadas
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const token = localStorage.getItem("gym_token");
    // Si no hay token, redirige al login inmediatamente
    return token ? <>{children}</> : <Navigate to="/login" replace />;
};

// Vistas temporales de ejemplo (luego las modularizaremos en features)
const LoginPage = () => <div className="p-8"><h1>Vista de Login</h1></div>;
const DashboardPage = () => <div className="p-8"><h1>Panel Principal del Gimnasio (Privado)</h1></div>;

export const AppRouter: React.FC = () => {
    return (
        <QueryProvider>
            <BrowserRouter>
                <Routes>
                    {/* Ruta Pública */}
                    <Route path="/login" element={<LoginPage />} />

                    {/* Rutas Privadas (Panel de Administración del Gimnasio) */}
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <DashboardPage />
                            </PrivateRoute>
                        }
                    />

                    {/* Redirección por defecto */}
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </BrowserRouter>
        </QueryProvider>
    );
};