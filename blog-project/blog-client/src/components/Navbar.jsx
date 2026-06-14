import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Navbar.css";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  return (
    <header className="navbar">
      <Link to="/" className="navbar-logo">
        The Blog
      </Link>

      <nav className="navbar-links">
        <Link
          to="/"
          className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
        >
          Home
        </Link>

        {user ? (
          <>
            <span className="nav-username">Hi, {user.username}</span>
            <button className="nav-btn" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className={`nav-link ${location.pathname === "/login" ? "active" : ""}`}
            >
              Login
            </Link>
            <Link to="/register" className="nav-btn-primary">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
