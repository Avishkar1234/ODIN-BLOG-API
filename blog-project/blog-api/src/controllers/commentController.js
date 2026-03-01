const prisma = require("../config/prisma");

// USER: Create comment on published post
exports.createComment = async (req, res) => {
    try {
        const { id } = req.params; // postId
        const { content } = req.body;

        if (!content) {
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
        });

        res.status(201).json(comment);

    } catch (error) {
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
        if (
            req.user.role !== "ADMIN" &&
            comment.authorId !== req.user.userId
        ) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await prisma.comment.delete({
            where: { id: Number(id) },
        });

        res.json({ message: "Comment deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};