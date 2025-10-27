import { Router } from "express";
import {verifyToken,requireRole} from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/dashboard", verifyToken,requireRole('admin'), (req, res) => {
  res.send({ message: "welcome admin", user: req.user });
});

router.get("/em", verifyToken,(req, res) => {
  res.send({ message: "welcome user", user: req.user });
});

export default router;

