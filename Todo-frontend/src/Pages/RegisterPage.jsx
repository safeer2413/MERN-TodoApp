import { useEffect, useState } from "react";
import "./Login.css"; // Import the CSS file
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

            <h1 className="text-2xl m-2 font-bold text-indigo-950">Register</h1>

            <form onSubmit={userRegisterHandler}>
                <input
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2 p-2 w-60 outline-none rounded-lg border-2 border-indigo-950"                    required
                    autoFocus
                />
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
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-2 p-2 w-60 outline-none rounded-lg border-2 border-indigo-950"
                    required
                />

                <button type="submit" disabled={isLoading} className="mt-2 p-2 w-60 bg-indigo-950 rounded-lg border-2 border-indigo-950 hover:bg-gray-900 disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed" disabled={isLoading} >
                    {isLoading ? 'Registering...' : 'Register'}
                </button>

                {isLoading &&

                    <div className="flex justify-center align-cente mt-2">
                        <ScaleLoader color="rgb(29, 12, 91)" className="mt-2" />
                    </div>}

                <div className="mt-4 text-indigo-950 border-indigo-950 hover:text-gray-500">
                    <Link to="/login">
                        Already have an account? <strong>Login</strong>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default RegisterPage;
