import { useEffect, useState } from "react";
import { useRegisterUserMutation } from "../Slices/userApiSlice.js";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ScaleLoader } from "react-spinners";


function RegisterPage() {
    const { userInfo } = useSelector((state) => state.auth);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [registerUser, { isLoading }] = useRegisterUserMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [userInfo, navigate]); // Removed `navigate` to prevent unnecessary re-renders

    const userRegisterHandler = async (e) => {
        e.preventDefault();
        setErrorMessage(""); // Reset error state

        try {
            let responseData = await registerUser({ name, email, password }).unwrap();
            toast.success("Registered");
            console.log(responseData);
            setName("");
            setEmail("");
            setPassword("");
            navigate("/login");


        } catch (error) {
            console.error("Register Failed:", error);
            setErrorMessage(error?.data?.message || "Registration failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-6">
            <div className="
                w-full max-w-[480px] p-10
                bg-white/95 backdrop-blur-xl
                rounded-[2.5rem]
                border border-white/40
                shadow-[0_40px_100px_rgba(29,12,91,0.3)]
                text-center
                animate-fadeIn">

                <h1 className="text-4xl mb-2 font-black text-indigo-950 tracking-tight">Join Us</h1>
                <p className="text-indigo-900/60 mb-10 font-medium">Create an account to start managing tasks.</p>

                <form onSubmit={userRegisterHandler} className="space-y-5">
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input-premium py-4"
                        required
                        autoFocus
                    />
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-premium py-4"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-premium py-4"
                        required
                    />

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn-premium w-full py-5 text-lg mt-4 shadow-2xl">
                        {isLoading ? 'Creating Account...' : 'Sign Up Now'}
                    </button>

                    {isLoading && (
                        <div className="flex justify-center mt-6">
                            <ScaleLoader color="rgb(79, 70, 229)" height={25} />
                        </div>
                    )}

                    <div className="mt-10 pt-8 border-t border-indigo-100/60 text-indigo-900/70">
                        <p className="text-indigo-900/50">Already have an account?</p>
                        <Link to="/login" className="inline-block mt-2 font-black text-indigo-600 hover:text-indigo-800 transition-all hover:scale-105 active:scale-95">
                            Sign In to Account
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;
