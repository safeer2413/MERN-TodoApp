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

const port = process.env.PORT || 5000;

// ADD all possible frontend origins
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",       // ← FIX
    "http://localhost:3000",
    "https://mern-todo-app-steel.vercel.app",
    "https://todo-frontend.vercel.app"
];

// FIXED CORS setup
app.use(
    cors({
        origin: function (origin, callback) {
            // Allow Postman / mobile apps
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            } else {
                console.log("CORS BLOCKED:", origin);
                return callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
    })
);

app.options("*", cors());

// Parsers
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Debug incoming origin
app.use((req, res, next) => {
    console.log("Incoming request from:", req.headers.origin);
    next();
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/todo", todoRoutes);

// Error handlers
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
