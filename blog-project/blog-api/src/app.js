require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const authRoutes = require("./routes/authRoutes.js");

app.use(cors());
app.use(express.json());

//Middlewares
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({ message: "API is running"});
});


module.exports = app;