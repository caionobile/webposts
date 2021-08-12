const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
  const allUsers = await Users.findAll();
  res.status(200).json(allUsers);
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });
  if (user) return res.status(400).json({ error: "Username already exists" });
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({ username: username, password: hash });
  });
  const previousUser = await Users.findAll({
    limit: 1,
    order: [["createdAt", "DESC"]],
  });
  const userId = previousUser[0].id + 1;
  const accessToken = sign(
    { id: userId, username: username },
    "5247d3f8-f962-11eb-9a03-0242ac130003"
  );
  res.status(201).json({ accessToken: accessToken, username: username });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Users.findOne({ where: { username: username } });
    if (!user)
      return res.status(400).json({
        error: "Username or password is incorrect. Authentication failed",
      });
    bcrypt.compare(password, user.password).then((match) => {
      if (!match)
        return res.status(400).json({
          error: "Username or password is incorrect. Authentication failed",
        });
      const accessToken = sign(
        { id: user.id, username: user.username },
        "5247d3f8-f962-11eb-9a03-0242ac130003"
      );
      return res.status(200).json({
        accessToken: accessToken,
        username: username,
        id: user.id,
      });
    });
  } catch (e) {
    return res.status(400).json({
      error: e,
    });
  }
});

router.get("/token", validateToken, (req, res) => {
  res.status(200).json({ id: req.user.id, username: req.user.username });
});

router.patch("/:id", async (req, res) => {});

module.exports = router;
