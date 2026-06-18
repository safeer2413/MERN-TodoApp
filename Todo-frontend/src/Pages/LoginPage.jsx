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
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-6">
            <div className="
                w-full max-w-[440px] p-10
                bg-white/95 backdrop-blur-xl
                rounded-[2.5rem]
                border border-white/40
                shadow-[0_40px_100px_rgba(29,12,91,0.3)]
                text-center
                animate-fadeIn">

                <h1 className="text-4xl mb-2 font-black text-indigo-950 tracking-tight">Welcome Back</h1>
                <p className="text-indigo-900/60 mb-10 font-medium">Please enter your details to sign in.</p>

                <form onSubmit={userLoginHandler} className="space-y-5">
                    <div className="relative">
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input-premium py-4"
                            required
                        />
                    </div>
                    <div className="relative">
                        <input
                            type="password"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-premium py-4"
                            required
                        />
                    </div>

                    <button type="submit" disabled={isLoading} className="btn-premium w-full py-5 text-lg mt-4 shadow-2xl" >
                        {isLoading ? "Validating..." : "Sign In"}
                    </button>

                    {isLoading && (
                        <div className="flex justify-center mt-6">
                            <ScaleLoader color="rgb(79, 70, 229)" height={25} />
                        </div>
                    )}

                    <div className="mt-10 pt-8 border-t border-indigo-100/60">
                        <p className="text-indigo-900/50">Don't have an account?</p>
                        <Link to="/register" className="inline-block mt-2 font-black text-indigo-600 hover:text-indigo-800 transition-all hover:scale-105 active:scale-95">
                            Create Free Account
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
