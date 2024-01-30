import express from "express";
const app = express();

app.use(express.json());

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to database successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internet server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, () => {
  console.log("API Working...");
});
