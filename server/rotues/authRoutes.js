import { Router } from "express";

import { signup, login, refresh, googleAuth } from "../controllers/authControllers.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/google",googleAuth);

export default router;
