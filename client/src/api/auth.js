import api from "./axios";

// Signup request
export const signup = async (userData) => {
  try {
    const res = await api.post("/auth/signup", userData);
    if (res.data.accessToken) {
      localStorage.setItem("accessToken", res.data.accessToken);
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
    }
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
