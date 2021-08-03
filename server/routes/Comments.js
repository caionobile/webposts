const express = require("express");
const router = express.Router();
const { Comments, Posts } = require("../models");

router.get("/:postId", async (req, res) => {
  const { postId } = req.params;
  const post = await Posts.findByPk(postId);
  if (!post) return res.status(404).json({ error: "Post not found" });
  const postComments = await Comments.findAll({
    where: { PostId: postId },
  });
  if (postComments.length > 0) res.status(200).json(postComments);
  else res.status(404).json({ error: "Empty comment section" });
});

router.post("/", async (req, res) => {
  try {
    const comment = req.body;
    await Comments.create(comment);
    res.status(201).json(comment);
  } catch (e) {
    res.status(400).json({
      error: e.errors ? "PostId cannot be null" : "Post doesn't exist",
    });
  }
});

module.exports = router;
