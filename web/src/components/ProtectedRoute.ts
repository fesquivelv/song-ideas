import type { JSX } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        Navigate( { to: '/login',replace: true });
    }

    return children;
}

export default ProtectedRoute;