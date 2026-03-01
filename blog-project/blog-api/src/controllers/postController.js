const prisma = require("../config/prisma");

exports.createPost = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: "Title and content required" });
        }

        const post = await prisma.post.create({
            data: {
                title,
                content,
                authorId: req.user.userId,
            },
        });

        res.status(201).json(post);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

//PUBLIC: Get all published posts
exports.getPublishedPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            where: { published: true },
            include: {
                author: true,
            }
        });

        res.json(posts);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// ADMIN: Get all posts (including unpublished)
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            include: { author: true },
        });

        res.json(posts);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};