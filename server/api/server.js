import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js";
import homeRotues from "./routes/homeRoutes.js";
import captch from "./routes/captch.js"


const app = express();
dotenv.config();

connectDB();
app.use(
  cors({
    origin:[ "https://login-system-chi-ruby.vercel.app","http://localhost:5173"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());


app.use("/auth", authRoutes);
app.use("/home", homeRotues);
app.use("/api/captch",captch)

app.get("/", (req, res) => {
  res.send("✅ Backend running successfully!");
});

export default app;