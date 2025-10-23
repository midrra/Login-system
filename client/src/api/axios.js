import axios from "axios";
import { useNavigate } from "react-router-dom";


const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // important for cookies
});

// Automatically add access token to headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle expired access token automatically
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

      if (originalRequest.url.includes("/auth/refresh")) {
      return Promise.reject(error);
      }
      
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
          const refreshRes = await api.post("/auth/refresh");
          console.log("here")
        const newAccessToken = refreshRes.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        api.defaults.headers.Authorization = `Bearer ${newAccessToken}`;

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (err) {
        console.error("Token refresh failed:", err.message);
        localStorage.removeItem("accessToken");

        //  Redirect user to login
         window.location.href = "/login"
      }
    }
    return Promise.reject(error);
  }
);

export default api;
