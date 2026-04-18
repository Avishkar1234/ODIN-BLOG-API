const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authenticateToken = require("../middleware/authMiddleware");
const authorizeAdmin = require("../middleware/authorizeAdmin");

//Public
router.get("/:id", postController.getSinglePost);
router.get("/", postController.getPublishedPosts);

//Admin
router.get(
  "/all",
  authenticateToken,
  authorizeAdmin,
  postController.getAllPosts,
);
router.post("/", authenticateToken, authorizeAdmin, postController.createPost);

router.patch(
  "/:id/publish",
  authenticateToken,
  authorizeAdmin,
  postController.togglePublish,
);

router.put(
  "/:id",
  authenticateToken,
  authorizeAdmin,
  postController.updatePost,
);

router.delete(
  "/:id",
  authenticateToken,
  authorizeAdmin,
  postController.deletePost,
);

module.exports = router;
