require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const authRoutes = require("./routes/authRoutes.js");
const authMiddleware = require("./middleware/authMiddleware.js");
const authorizeAdmin = require("./middleware/authorizeAdmin.js");
const authenticateToken = require("./middleware/authMiddleware.js");

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/api/protected", authMiddleware, (req, res) => {
    res.json({
        message: "You accessed a protected route",
        user: req.user
    });
});

//Temporary
app.get("/api/admin-test",
    authenticateToken,
    authorizeAdmin,
    (req, res) => {
        res.json({ message: "Welcom Admin" });
    }  
);

app.get("/", (req, res) => {
    res.json({ message: "API is running" });
});


module.exports = app;