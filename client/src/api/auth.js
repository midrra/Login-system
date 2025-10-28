import api from "./axios";
import { jwtDecode } from "jwt-decode";
// import fs from "fs";

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

//Google login
export const googleLogin = async (googleData) => {
  try {
    const res = await api.post("auth/google", googleData);
    if (res.data.accessToken) {
      localStorage.setItem("accessToken", res.data.accessToken);
    }
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

//Facebook Login
export const facebookLogin  =async(facebookData)=>{
  try{
    const res = await api.post("/auth/facebook",facebookData)
  return res.data;
  }catch(error){
    throw new Error(error.response?.data?.message || error.message);

  }
}

//OTP
export const createOtp = async (values) => {
  try {
    const res = await api.post("auth/create-otp", values);
    return res.data;
    console.log(res, "the opt is created");
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const verifyOtp = async (values) => {
  try {
    const res = await api.post("auth/verify-otp",
      values,
    );
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
