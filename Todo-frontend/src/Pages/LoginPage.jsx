import { useEffect, useState } from "react";
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
        <div className="
    w-75 h-full p-4
    bg-[#5239AB]
    rounded-[10px]
    border-2 border-[#1D0C5B]
    shadow-[0px_0px_10px_rgba(0,0,0,0.1)]
    text-center
    transition
    duration-200
    ease-in-out
    hover:-translate-y-[6px]
    hover:scale-[1.03]
    hover:shadow-[0_12px_24px_rgba(0,0,0,0.15)]">

            <h1 className="text-2xl m-2 font-bold text-indigo-950">Login</h1>

            <form onSubmit={userLoginHandler}>
                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 p-2 w-60 outline-none rounded-lg border-2 border-indigo-950"
                    required
                />
                <input
                    type="password"
                    value={password}
                    placeholder="Enter Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-2 p-2 w-60 outline-none rounded-lg border-2 border-indigo-950"
                    required
                />

                <button type="submit" disabled={isLoading} className="mt-2 p-2 w-60 bg-indigo-950 rounded-lg border-2 border-indigo-950 hover:bg-gray-900 disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed" >
                    {isLoading ? "Logging in..." : "Login"}
                </button>

                {isLoading && (
                    <div className="flex justify-center align-cente mt-2">
                        <ScaleLoader color="rgb(29, 12, 91)" className="mt-2"  />
                    </div>
                )}

                <div className="mt-4 text-indigo-950 border-indigo-950 hover:text-gray-500">
                    <Link to="/register">
                        Don’t have an account? <strong>Register</strong>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;
