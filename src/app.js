import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();


// Middlewares
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));
app.use(express.static("public"));
app.use(cors({
    origin: process.env.CLIENT_URL,
     credentials: true
}));
app.use(cookieParser());


// Routes import
import userRouter from "./routes/user.routes.js";



// Routes declaration
app.use("/api/v1/users", userRouter);



export default app;