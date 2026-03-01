const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authenticateToken = require("../middleware/authMiddleware");
const authorizeAdmin = require("../middleware/authorizeAdmin");

//Public
router.get("/", postController.getPublishedPosts);

//Admin
router.get("/all", authenticateToken, authorizeAdmin, postController.getAllPosts);
router.post("/", authenticateToken, authorizeAdmin, postController.createPost);

module.exports = router;
