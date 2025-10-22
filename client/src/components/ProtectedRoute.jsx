import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/axios"; 

export default function ProtectedRoute({ children, requiredRole }) {
  const [status, setStatus] = useState("loading");
  const [role, setRole] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setStatus("unauthorized");
        return;
      }

      try {
        const res = await api.get("/home/em");

        setRole(res.data.user.role);
        setStatus("authorized");
      } catch (err) {
        localStorage.removeItem("accessToken");
        setStatus("unauthorized");
      }
    };

    checkAuth();
  }, []);

  if (status === "loading") return <p>Loading...</p>;

  if (status === "unauthorized") return <Navigate to="/login" replace />;

  if (requiredRole && role !== requiredRole)
    return <Navigate to="/unauthorized" replace />;

  return children;
}
