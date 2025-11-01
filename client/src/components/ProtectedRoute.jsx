import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/axios"; 

export default function ProtectedRoute({ children, requiredRole }) {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        return;
      }

      try {
        const res = await api.get("/home/em");

        setRole(res.data.user.role);
      } catch (err) {
        localStorage.removeItem("accessToken");
      }
    };

    checkAuth();
  }, []);

  if (requiredRole && role !== requiredRole)
    return <Navigate to="/unauthorized" replace />;

  return children;
}
