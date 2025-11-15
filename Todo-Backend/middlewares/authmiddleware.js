import Users from "../Model/userModel.js";
import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
    try {
        const token = req.cookies?.jwt; // optional chaining

        if (!token) {
            return res.status(401).json({ message: "Not authorized, no token" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Users.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user; // attach user to request
        next(); // move on to next handler

    } catch (error) {
        console.error("JWT Error:", error.message);

        // More specific error message for debugging
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired, please log in again" });
        }

        return res.status(401).json({ message: "Not authorized, token invalid or expired" });
    }
};

export { protect };
