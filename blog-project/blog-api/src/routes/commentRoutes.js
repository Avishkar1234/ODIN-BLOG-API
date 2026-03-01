const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController.js")
const authenticateToken = require("../middleware/authMiddleware.js");

// Create comment on post
router.post(
    "/posts/:id/comments",
    authenticateToken,
    commentController.createComment
);

// Delete comment
router.delete(
    "/comments:/id",
    authenticateToken,
    commentController.deleteComment
);

module.exports = router;