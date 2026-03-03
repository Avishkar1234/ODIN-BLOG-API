import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav style={styles.nav}>
            <h2 style={styles.logo}>Blog</h2>

            <div style={styles.links}>
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>
        </nav>
    );
}

const styles = {
    nav: {
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem 2rem",
        borderBottom: "1px solid #ccc",
    },
    logo: {
        margin: 0,
    },
    links: {
        display: "flex",
        gap: "1rem",
    },
};

export default Navbar;