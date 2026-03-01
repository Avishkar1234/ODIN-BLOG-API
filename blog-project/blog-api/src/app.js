const express = require("express");
const cors = require("cors");

const app = express();

const prisma = require("./config/prisma");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "API is running"});
});

app.get("/test-db", async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
})

module.exports = app;