import React from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function ProtectedRoute({ children, requiredRole }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  if (!token) return <Navigate to="/login" replace />;

  const { role, exp } = jwtDecode(token);
  if (Date.now() >= exp * 1000) {
    localStorage.clear();
    return <navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole)
    return <Navigate to="/unauthorized" replace />;

  return children;
}
