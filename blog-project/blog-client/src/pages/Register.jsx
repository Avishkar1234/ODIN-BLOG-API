import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Register() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        try {
            await API.post("/api/auth/register", {
                email,
                username,
                password,
            });

            setMessage("Registration successful! Redirecting to login...");
            setTimeout(() => navigate("/login", 1500));
        } catch (err) {
            setError(
                err.response?.data?.message || "Registration failed"
            );
        }
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Register</h2>

            <form 
              onSubmit={handleSubmit}    
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                maxWidth: "300px",
              }}        
            >
                <input
                 type="email"
                 placeholder="Email"
                 onChange={(e) => setEmail(e.target.value)}
                 required
                />

                <input
                 type="text"
                 placeholder="Username"
                 value={username}
                 onChange={(e) => setUsername(e.target.value)}
                 required
                />

                <input
                 type="password"
                 placeholder="Password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 required
                />

                <button type="submit">Register</button>

                {message && <p style={{ color: "green" }}>{message}</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    );
}

export default Register;