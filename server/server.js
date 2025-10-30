import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import authRoutes from "./rotues/authRoutes.js";
import homeRotues from "./rotues/homeRoutes.js";
import captch from "./rotues/captch.js"
import serverless from "serverless-http";


const app = express();

dotenv.config();
connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // allow cookies / auth headers
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());


app.use("/auth", authRoutes);
app.use("/home", homeRotues);
app.use("/api/captch",captch)

export const handler = serverless(app);