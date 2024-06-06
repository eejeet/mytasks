import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory hook
import axios from "axios";
import api from "../services/api";
import { axiosErrorAlert, successAlert } from "../services/helpers";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Initialize useHistory hook

    const handleLogin = async () => {
        try {
            // Make API call to login endpoint
            const response = await api.post("/login", { email, password });
            // if reponse is successful, save token to local storage
            if (response.data.status) {
                localStorage.setItem("token", response.data.data.token);
                // Save user data to local storage
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.data.user)
                );
                // Display success message
                successAlert(response.data.message);
                window.location.href = "/tasks";
            }

            // Handle successful login
            console.log(response.data);
        } catch (error) {
            // Handle login erro
            console.error(error);
            axiosErrorAlert(error);
        }
    };

    return (
        <div className="container">
            <h1>Login</h1>
            <form>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    type="button"
                    className="btn btn-primary mt-1"
                    onClick={handleLogin}
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
