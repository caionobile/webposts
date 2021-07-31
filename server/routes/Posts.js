const express = require("express");
const router = express.Router();
const { Posts } = require("../models");

router.get("/", async (req, res) => {
  const allPosts = await Posts.findAll();
  res.status(200).json(allPosts);
});

router.get("/:id", async (req, res) => {
  const postById = await Posts.findAll({ where: { id: req.params.id } });
  if (postById.length > 0) res.status(200).json(postById);
  else res.status(404).json({ error: "Post not found" });
});

router.post("/", async (req, res) => {
  try {
    const post = req.body;
    await Posts.create(post);
    res.status(201).json(post);
  } catch (e) {
    res.status(400).json({ error: e.errors.map((err) => err.message) });
  }
});

router.put("/:id", async (req, res) => {
  const postById = await Posts.findAll({ where: { id: req.params.id } });
  if (postById.length > 0) {
    const postUpdated = await Posts.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json(postUpdated);
  } else res.status(404).json({ error: "Post not found" });
});

router.delete("/:id", async (req, res) => {
  const postById = await Posts.findAll({ where: { id: req.params.id } });
  if (postById.length > 0) {
    await Posts.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: `Post ${req.params.id} deleted` });
  } else res.status(404).json({ error: "Post not found" });
});

module.exports = router;
