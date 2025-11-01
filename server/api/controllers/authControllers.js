import User from "../models/User.js";
import Otp from "../models/Otp.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import axios from "axios";
import nodemailer from "nodemailer";

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "5m" }
  );

  const refreshToken = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};

// Signup
export const signup = async (req, res) => {
  const { firstName, lastName, email, password, captchaToken } = req.body;
  try {
    const otpRecord = await Otp.findOne({ email });
    if (!otpRecord || !otpRecord.verified) {
      return res.status(400).json({ message: "Please verify your OTP first" });
    }

    // Verify captcha
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${captchaToken}`
    );

    if (!response.data.success || response.data.score < 0.5) {
      return res.status(400).json({ message: "Captcha verification failed" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const { accessToken, refreshToken } = generateTokens(newUser);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ success: true, accessToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    if (!user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const { accessToken, refreshToken } = generateTokens(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ success: true, accessToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Refresh
export const refresh = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return res.status(401).json({ message: "No refresh token" });

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid refresh token" });

    const accessToken = jwt.sign(
      { id: decoded.id, email: decoded.email, role: decoded.role },
      process.env.JWT_SECRET,
      { expiresIn: "5m" }
    );
    res.json({ success: true, accessToken });
  });
};

//GoogleLogin
export const googleAuth = async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ message: "Token required" });

  try {
    // Fetch user info from Google using the access token
    const userInfoResponse = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const user = await userInfoResponse.json();

    //Check for excitsting user
    const email = user.email;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const { accessToken, refreshToken } = generateTokens(existingUser);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        accessToken,
      });
    }

    const newUser = await User.create({
      firstName: user.given_name,
      lastName: user.family_name,
      email: user.email,
      picture: user.picture,
      sub: user.sub,
    });

    const { accessToken, refreshToken } = generateTokens(newUser);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser,
      accessToken,
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: "Google login failed" });
  }
};

//Facebook Login
export const facebookAuth = async (req, res) => {
  const { token } = req.body;
  try {
    const response = await fetch(
      `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${token}`
    );
    const user = await response.json();

    const existingUser = await User.findOne({ email: user.email });

    if (existingUser) {
      const { accessToken, refreshToken } = generateTokens(existingUser);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        accessToken,
      });
    }

    const newUser = await User.create({
      firstName: user.name.split(" ")[0],
      lastName: user.name.split(" ")[1],
      email: user.email,
    });
    const { accessToken, refreshToken } = generateTokens(newUser);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ message: "Facebook login successful", accessToken });
  } catch (error) {
    res.status(500).json({ message: "Facebook login failed", error });
  }
};

//OTP
export const createOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email required" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const otpHash = await bcrypt.hash(otp, 10);
  await Otp.updateOne(
    { email: email },
    {
      otpHash: otpHash,
      expiresAt: Date.now() + 5 * 60 * 1000,
      verified: false,
    },
    { upsert: true }
  );

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Login System" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your One-Time Password (OTP)",
      text: `Your verification code is ${otp}. It expires in 5 minutes.`,

      html: `
    <div style="
      font-family: Arial, sans-serif;
      background: #f9fafb;
      padding: 24px;
      border-radius: 8px;
      color: #111;
      line-height: 1.5;
      max-width: 480px;
      margin: auto;
      border: 1px solid #e5e7eb;
    ">
      <h2 style="color: #2563eb;">🔐 Verify Your Email</h2>
      <p>Hi there,</p>
      <p>Use the following one-time password (OTP) to verify your account. This code will expire in <strong>5 minutes</strong>.</p>
      <p style="
        font-size: 28px;
        font-weight: bold;
        letter-spacing: 4px;
        background: #2563eb;
        color: white;
        padding: 12px 0;
        text-align: center;
        border-radius: 6px;
      ">
        ${otp}
      </p>
      <p>If you didn’t request this code, please ignore this email.</p>
      <p>replyTo: "support@login-system.com"</p>
      <p style="margin-top: 32px; color: #6b7280;">— The Login System Team</p>
    </div>
  `,
    });

    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to send OTP", error: err.message });
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  const otpEmail = await Otp.findOne({ email });

  if (!otpEmail) return res.status(400).json({ message: "No OTP found" });

  if (Date.now() > new Date(otpEmail.expiresAt).getTime()) {
    await Otp.deleteOne({ email });
    return res.status(400).json({ message: "OTP expired" });
  }

  const isMatch = await bcrypt.compare(otp, otpEmail.otpHash);

  if (!isMatch) return res.status(400).json({ message: "Invalid OTP" });

  await Otp.updateOne({ email }, { verified: true });

  res.json({ message: "OTP verified successfully" });
};
