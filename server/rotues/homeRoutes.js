import { Router } from "express";
import authMiddlewares from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", authMiddlewares, (req, res) => {
  res.send({ running: "Auth API is running...", user: req.user });
});

export default router;
