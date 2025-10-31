import express from 'express';
const router = express.Router();
import {verifyCaptcha} from "../controllers/captchaController.js"

// POST /api/captcha
router.post("/", verifyCaptcha);

export default router;