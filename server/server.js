import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import authRoutes from "./rotues/authRoutes.js";
import homeRotues from "./rotues/homeRoutes.js";

const app = express();

dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/home", homeRotues);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
