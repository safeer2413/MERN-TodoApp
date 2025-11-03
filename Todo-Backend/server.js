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

app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
}));


app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ Routes
app.use("/api/users", userRoutes);
app.use("/api/todo", todoRoutes);

// ✅ Error handling
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
