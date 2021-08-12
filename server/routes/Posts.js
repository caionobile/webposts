const express = require("express");
const router = express.Router();
const { Posts } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
  const allPosts = await Posts.findAll();
  res.status(200).json(allPosts);
});

router.get("/:id", async (req, res) => {
  const postById = await Posts.findByPk(req.params.id);
  if (postById) res.status(200).json(postById);
  else res.status(404).json({ error: "Post not found" });
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

router.delete("/:id", async (req, res) => {
  const postById = await Posts.findByPk(req.params.id);
  if (postById) {
    await Posts.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: `Post ${req.params.id} deleted` });
  } else res.status(404).json({ error: "Post not found" });
});

module.exports = router;
