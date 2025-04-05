import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import profileRoutes from "./routes/profile";
import athleteRoutes from "./routes/athleteRoutes";
import connectDB from "./config/db";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes with base path
app.use("/limitless-backend/api/auth", authRoutes);
app.use("/limitless-backend/api/user", userRoutes);
app.use("/limitless-backend/api/profile", profileRoutes);
app.use("/limitless-backend/api/athletes", athleteRoutes);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

const PORT = process.env.PORT || 5001;

mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/limitless-athletes")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("Database connection error:", err)); 