import React from "react";
import { createContext, useState, useEffect } from "react";
import API from "../api/axios"

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    //Load user from token on app start
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            fetchCurrentUser();
        }
    }, []);

    const fetchCurrentUser = async () => {
        try {
            const res = await API.get("/api/auth/me"); // make sure your backend has this route
            setUser(res.data);
        } catch (err) {
            console.error("Auth error:", err);
            logout();
        }
    };

    const login = (token) => {
        localStorage.setItem("token", token);
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        fetchCurrentUser();
    }

    const logout = () => {
        localStorage.removeItem("token");
        delete API.defaults.headers.common["Authorization"];
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;