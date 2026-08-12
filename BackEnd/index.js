import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import propertyRouter from "./routes/property.routes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5175",
      "https://real-estate-tau-two-65.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

mongoose.connect(process.env.MONGO_DB_URL)
.then(() => {
    console.log("Database connected Successfully.");

    app.listen(3000, () => {
        console.log("App is running on port 3000");
    });

})
.catch((err) => {
    console.log("Database connection error:", err.message);
});

app.use("/BackEnd/user", userRouter);
app.use("/BackEnd/auth", authRouter);
app.use("/BackEnd/properties", propertyRouter);