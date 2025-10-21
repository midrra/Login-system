import { Router } from "express";
import {verifyToken,requireRole} from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", verifyToken,requireRole('admin'), (req, res) => {
  res.send({ running: "welcome admin", user: req.user });
});

export default router;
