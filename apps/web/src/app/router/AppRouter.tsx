import React from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { LoginPage } from "../../features/auth/pages/LoginPage.js";
import { WelcomePage } from "../../features/auth/pages/WelcomePage.js";
import { QueryProvider } from "../providers/QueryProvider.js";

// Guardia de rutas privadas encapsulada como componente
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const token = localStorage.getItem("gym_token");
    return token ? <>{children}</> : <Navigate to="/login" replace />;
};

const DashboardPage = () => (
    <div className="p-8">
        <h1 className="text-3xl font-black">Panel Principal del Gimnasio 🏋️‍♂️</h1>
        <p className="mt-2 text-zinc-600">Acceso autorizado correctamente.</p>
    </div>
);

// Definición de rutas basada en un arreglo de objetos (Data Router)
const router = createBrowserRouter([
    {
        path: "/",
        element: <WelcomePage />,
        errorElement: <div className="p-8 text-red-600 font-bold">¡Vaya! Algo salió mal en la página principal.</div>,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/dashboard",
        element: (
            <PrivateRoute>
                <DashboardPage />
            </PrivateRoute>
        ),
    },
    {
        path: "*",
        element: <Navigate to="/" replace />,
    },
]);

// Componente envoltorio que provee tanto React Query como el Router moderno
export const AppRouter: React.FC = () => {
    return (
        <QueryProvider>
            <RouterProvider router={router} />
        </QueryProvider>
    );
};