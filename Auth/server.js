import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
dotenv.config();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);


app.get('/',(req, res)=>{
    res.json({message: "Server Running"})
})
// mongodb connect
mongoose
    .connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
    })
    .then(() => console.log("Database connected"))
    .catch((er) => console.log("Error connecting database",{er}));

app.listen(4000, () => {
    console.log("Connected to backend");
});