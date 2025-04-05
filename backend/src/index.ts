
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes"; // Existing signup/login routes
import userRoutes from "./routes/userRoutes"; // Profile management routes
import profileRoutes from "./routes/profile";
import connectDB from "./config/db";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);  // Signup/Login Routes
app.use("/api/user", userRoutes);  // User Profile Routes
app.use("/api/profile", profileRoutes); // Profile Routes


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
