const prisma = require("../config/prisma");

// USER: Create comment on published post
exports.createComment = async (req, res) => {
  try {
    const { id } = req.params; // postId
    const { content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({ message: "Content required" });
    }

    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
    });

    if (!post || !post.published) {
      return res.status(404).json({ message: "Post not available" });
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        postId: Number(id),
        authorId: req.user.userId,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ADMIN or OWNER: Delete comment
exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params; // commentId

    const comment = await prisma.comment.findUnique({
      where: { id: Number(id) },
    });

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Admin OR comment owner
    if (req.user.role !== "ADMIN" && comment.authorId !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await prisma.comment.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Comment deleted", id: Number(id) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ADMIN or OWNER: Update comment
exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({ message: "Content required" });
    }

    const comment = await prisma.comment.findUnique({
      where: { id: Number(id) },
    });

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (req.user.role !== "ADMIN" && comment.authorId !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedComment = await prisma.comment.update({
      where: { id: Number(id) },
      data: { content },
      include: {
        author: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    res.json(updatedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
