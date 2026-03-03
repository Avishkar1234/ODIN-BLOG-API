const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController.js");
const { verifyToken } = require("../middleware/authMiddleware.js");

router.post("/register", authController.register);
router.post("/login", authController.login);

router.get("/me", verifyToken, authController.getCurrentUser)

module.exports = router;