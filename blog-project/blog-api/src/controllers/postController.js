const { json } = require("express");
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
                comments: {
                    include: {
                        author: true,
                    },
                },
            },
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

//ADMIN: Toggle publish status
exports.togglePublish = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await prisma.post.findUnique({
            where: { id: Number(id) },
        });

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const updatedPost = await prisma.post.update({
            where: { id: Number(id) },
            data: {
                published: !post.published,
            },
        });

        res.json(updatedPost);

    } catch (error) {
        res.status(500),json({ message: "Server error"});
    }
};

//ADMIN: Update post
exports.updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        const updatedPost = await prisma.post.update({
            where: { id: Number(id) },
            data: {
                title,
                content,
            }
        });

        res.json(updatedPost);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

//ADMIN: Delete post
exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.post.delete({
            where: { id: Number(id) },
        });

        res.json({ message: "Post deleted" });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// PUBLIC: Get single published post with comments
exports.getSinglePost = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await prisma.post.findUnique({
            where: { id: Number(id) },
            include: {
                author: true,
                comments: {
                    include: {
                        author: true,
                    },
                },
            },
        });

        if (!post || !post.published) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.json(post);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};