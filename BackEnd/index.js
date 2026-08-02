import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();

const app = express();
app.use(express.json());

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