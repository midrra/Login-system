// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api/auth", // adjust to your backend route
// });

// // Attach token automatically
// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token");
//   if (token) req.headers.Authorization = `Bearer ${token}`;
//   return req;
// });

// export const signup = (formData) => API.post("/signup", formData);
// export const login = (formData) => API.post("/login", formData);
