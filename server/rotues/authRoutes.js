import { Router } from "express";

import { signup, login, refresh } from "../controllers/authControllers.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/refresh", refresh);

export default router;
