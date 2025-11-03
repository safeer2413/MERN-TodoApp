import { useEffect, useState } from "react";
import "./Login.css";
import { useUserLoginMutation } from "../Slices/userApiSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../Slices/authSlice";
import { ScaleLoader } from "react-spinners";

function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);

    const [userLogin, { isLoading }] = useUserLoginMutation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // 🧹 Reset form on mount (ensures logout clears fields)
    useEffect(() => {
        if (!userInfo) {
            setEmail("");
            setPassword("");
        }
    }, [userInfo]);

    // 🧭 Redirect to homepage if already logged in
    useEffect(() => {
        if (userInfo) navigate("/");
    }, [userInfo, navigate]);

    // 🔐 Login handler
    const userLoginHandler = async (e) => {
        e.preventDefault();

        if (!email.trim() || !password.trim()) {
            toast.error("Please enter both email and password");
            return;
        }

        try {
            const response = await userLogin({ email, password }).unwrap();
            dispatch(setCredentials({ ...response }));
            toast.success("Login successful!");
            navigate("/");
        } catch (error) {
            const message =
                error?.data?.message || "Invalid credentials. Please try again.";
            toast.error(message);
            console.error("Login Failed:", error);
        }
    };

    return (
        <div className="login-container">
            <h1 className="login-title">Login</h1>

            <form onSubmit={userLoginHandler} className="login-form">
                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input"
                    required
                />
                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                    required
                />

                <button type="submit" className="login-button" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                </button>

                {isLoading && (
                    <div className="loader-container">
                        <ScaleLoader color="rgb(29, 12, 91)" />
                    </div>
                )}

                <div className="message">
                    <Link to="/register" className="message">
                        Don’t have an account? <strong>Register</strong>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;
