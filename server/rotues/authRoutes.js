import { Router } from "express";

import {login, signup,refresh, googleAuth,createOtp,verifyOtp } from "../controllers/authControllers.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/google",googleAuth);
router.post("/create-otp",createOtp);
router.post("/verify-otp",verifyOtp);

export default router;
