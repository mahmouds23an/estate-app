import express from "express";
const app = express();

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

app.listen(3000, () => {
  console.log("API Working...");
});
