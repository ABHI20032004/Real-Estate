import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.route.js";

const app = express();
app.use(express.json());

await mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => console.log("Database connected Successfully."))
  .catch((err) => {
    console.log("Error: ", err.message);
  });

app.listen(3000, () => {
  console.log("app is running on port 3000");
});

app.use("/BackEnd/user",userRouter );
app.use("/BackEnd/auth",authRouter );
