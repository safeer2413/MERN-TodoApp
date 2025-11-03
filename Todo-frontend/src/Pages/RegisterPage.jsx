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
        <div className="login-container">
            <h1 className="login-title">Register</h1>
            <form onSubmit={userRegisterHandler} className="login-form">
                <input
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="login-input"
                    required
                    autoFocus
                />
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

                {/* Improved error message display */}
                {errorMessage && (
                    <div className="error-message">
                        <p>{errorMessage}</p>
                    </div>
                )}

                <button type="submit" className="login-button" >
                    {isLoading ? 'Registering...' : 'Register'}
                </button>

                {isLoading &&

                    <div className="loader">
                        <ScaleLoader color="rgb(29, 12, 91)" />
                    </div>}

                <div className="message">
                    <Link to="/login" className="message">
                        Already have an account? <strong>Login</strong>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default RegisterPage;
