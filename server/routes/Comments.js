const express = require("express");
const router = express.Router();
const { Comments, Posts } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

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

router.post("/", validateToken, async (req, res) => {
  try {
    const comment = req.body;
    comment.username = req.username;
    await Comments.create(comment);
    res.status(201).json(comment);
  } catch (e) {
    res.status(400).json({
      error: e.errors ? "PostId cannot be null" : "Post doesn't exist",
    });
  }
});

router.delete("/:commentId", validateToken, async (req, res) => {
  const commentId = req.params.commentId;
  await Comments.destroy({ where: { id: commentId } });
  res.status(200).json({ message: "Comment deleted" });
});

module.exports = router;
