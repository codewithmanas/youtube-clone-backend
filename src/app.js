import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

// Utils Import
// import { responseFormatter } from "./utils/responseFormatter.js";
// import { errorFormatter } from "./utils/errorFormatter.js";
import { ApiResponse } from "./utils/ApiResponse.js";
// import { ApiError } from "./utils/ApiError.js";

// Routes Import
import userRouter from "./routes/user.route.js";
import healthCheckRouter from "./routes/health_check.route.js";


// Middlewares
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));
app.use(express.static("public"));
app.use(cors({
    origin: process.env.CLIENT_URL,
     credentials: true
}));
app.use(cookieParser());


// Routes
app.get("/", (req, res) => {
    res.status(200).send("App is running");
});

app.get("/health-check", (req, res) => {
    res.status(200).send("Health is OK");
});



// Routes declaration
app.use("/api/v1/users", userRouter);
app.use("/health", healthCheckRouter);



// 404 Error Handling
app.use((req, res, next) => {
    res.status(404).json(new ApiResponse(404, "Route not found"));
});


// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error("Error Stack: ", err.stack);
  
    // res.status(err.status || 500).json({
    //   message: err.message || 'Internal Server Error',
    //   error: process.env.NODE_ENV === 'development' ? err : {},
    // });

    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    const data = err.data;
    const errors = process.env.NODE_ENV === 'development' ? err.errors : null;

    const response = new ApiResponse(statusCode, message, data, errors);

    res.status(statusCode).json(response);

  });



export default app;