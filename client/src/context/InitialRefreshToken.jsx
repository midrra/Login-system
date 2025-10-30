import React, { useEffect, createContext, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";


export const InitialRefresh = createContext();

function InitialRefreshToken({ children }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const refreshToken = async () => {
    try {
      const res = await api.post("/auth/refresh");
      if (res.data.accessToken) {
        localStorage.setItem("accessToken", res.data.accessToken);
      }
    } catch (error) {
      localStorage.removeItem("accessToken");
      navigate("/signup", { replace: true });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshToken();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen"><Spinner className="h-10 w-10"/></div>
  }

  return (
    <InitialRefresh.Provider value={{ refreshToken }}>
      {children}
    </InitialRefresh.Provider>
  );
}

export default InitialRefreshToken;
