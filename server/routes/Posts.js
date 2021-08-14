const express = require("express");
const router = express.Router();
const { Posts, Likes } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { userToken } = require("../middlewares/UserDataMiddleware");

router.get("/", userToken, async (req, res) => {
  let allPosts = await Posts.findAll({ include: [Likes] });
  if (req.user) {
    const { id } = req.user;
    const liked = allPosts.map((post) =>
      post.Likes.some((like) => like.UserId == id)
    );
    allPosts = {allPosts: allPosts, liked: liked}
  }
  res.status(200).json(allPosts);
});

/* router.get("/likedPosts", userToken, async (req, res) => {
  try {
    const allPosts = await Posts.findAll({ include: [Likes] });
    const { id } = req.user;
    const teste = [];
    const newArr = allPosts.map((post) =>
      post.Likes.some((like) => like.UserId == id)
    );
    for (let i = 0; i < newArr.length; i++) {
      teste.push({ liked: newArr[i] });
    }
    res.status(200).json(teste);
  } catch (e) {
    res.status(400).json(e);
  }
}); */

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
