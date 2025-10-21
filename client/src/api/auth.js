import api from "./axios";
import { jwtDecode } from "jwt-decode";
// import fs from "fs";

// Signup request
export const signup = async (userData) => {
  try {
    const res = await api.post("/auth/signup", userData);
    if (res.data.accessToken) {
      localStorage.setItem("accessToken", res.data.accessToken);
      const decoded = jwtDecode(res.data.accessToken);
      console.log("From decoded", decoded);
      localStorage.setItem("role", decoded.role);
    }
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// Login request
export const login = async (credentials) => {
  try {
    const res = await api.post("/auth/login", credentials);
    if (res.data.accessToken) {
      localStorage.setItem("accessToken", res.data.accessToken);
      const decoded = jwtDecode(res.data.accessToken);
      localStorage.setItem("role", decoded.role);
    }
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

//Google login

export const googleLogin = async (googleData) => {
  try {
    const res = await api.post("auth/google", googleData);
    if (res.data.accessToken) {
      localStorage.setItem("accessToken", res.data.accessToken);
      const decoded = jwtDecode(res.data.accessToken);
      localStorage.setItem("role", decoded.role);
    }
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
