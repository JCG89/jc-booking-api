import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import roomsRoute from "./routes/rooms.js";
import hotelsRoute from "./routes/hotels.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const PORT = process.env.MONGODB;
//connect to mongoose
const connect = async () => {
  try {
    await mongoose.connect(PORT);
    console.log("connected to MongoDb");
  } catch (error) {
    throw error;
  }
};
mongoose.connection.on("disconnected", () => {
  console.log("mongodb disconnected");
});

const app = express();
// Middlewares
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

// Error handler
app.use((error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMessage = error.message || "Something wrong";
  return res.status(errorStatus).json({
    success: false,
    message: errorMessage,
    status: errorStatus,
    stack: error.stack,
  });
});

app.listen(8000, () => {
  connect();
  console.log("Bienvenue sur gomis-booking");
});
