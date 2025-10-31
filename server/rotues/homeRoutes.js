import { Router } from "express";
import { verifyToken, requireRole } from "../middlewares/authMiddleware.js";
import User from "../models/User.js";

const router = Router();

router.get("/dashboard", verifyToken, requireRole("admin"), (req, res) => {
  res.send({ message: "welcome admin", user: req.user });
});

router.get("/em", verifyToken, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.send({ message: "welcome user", user: user });
});

export default router;
