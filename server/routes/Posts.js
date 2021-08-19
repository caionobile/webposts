const express = require("express");
const router = express.Router();
const { Posts, Likes, Comments } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { userToken } = require("../middlewares/UserDataMiddleware");

router.get("/", userToken, async (req, res) => {
  let allPosts = await Posts.findAll({ include: [Likes, Comments] });
  if (req.user) {
    const { id } = req.user;
    const liked = allPosts.map((post) =>
      post.Likes.some((like) => like.UserId == id)
    );
    allPosts = { allPosts: allPosts, liked: liked };
  }
  res.status(200).json(allPosts);
});

router.get("/:id", userToken, async (req, res) => {
  let postById = await Posts.findByPk(req.params.id, { include: [Likes] });
  if (!postById) return res.status(404).json({ error: "Post not found" });
  try {
    if (req.user) {
      const { id } = req.user;
      const liked = postById.Likes.some((like) => like.UserId == id);
      postById = { postById: postById, liked: liked };
    }
    res.status(200).json(postById);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.post("/", validateToken, async (req, res) => {
  try {
    const post = req.body;
    post.username = req.user.username;
    await Posts.create(post);
    res.status(201).json(post);
  } catch (e) {
    res.status(400).json({ error: e.errors.map((err) => err.message) });
  }
});

router.put("/:id", async (req, res) => {
  const postById = await Posts.findByPk(req.params.id);
  if (postById) {
    await Posts.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json(postById);
  } else res.status(404).json({ error: "Post not found" });
});

router.delete("/:id", validateToken, async (req, res) => {
  const postId = req.params.id;
  const postById = await Posts.findByPk(postId);
  if (postById) {
    await Posts.destroy({ where: { id: postId } });
    res.status(200).json({ message: `Post ${postId} deleted` });
  } else res.status(404).json({ error: "Post not found" });
});

module.exports = router;
