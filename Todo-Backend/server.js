import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./config/db.js";
import userRoutes from "./Routes/userRoutes.js";
import todoRoutes from "./Routes/todoRoutes.js";
import cors from "cors";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import cookieParser from "cookie-parser";

const app = express();
connectDb();

const port = process.env.PORT || 5001;

const allowedOrigins = [
    "http://localhost:5173",
    "https://mern-todo-app-steel.vercel.app", // User verified frontend
    "https://todo-frontend.vercel.app" // Generic backup if needed
];

app.use(
    cors({
        origin: allowedOrigins,       //
        credentials: true,            // enables cookies/JWT sharing
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type"],
    })
);

// Handle preflight requests
app.options("*", cors());


app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    console.log("Incoming request from:", req.headers.origin);
    next();
});

// ✅ Routes
app.use("/api/users", userRoutes);
app.use("/api/todo", todoRoutes);

// ✅ Error handling
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
