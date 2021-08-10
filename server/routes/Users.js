const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

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
  res.status(201).json({ message: "User created" });
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

      const accessToken = sign({ id: user.id, username: user.username }, "5247d3f8-f962-11eb-9a03-0242ac130003");
      return res.status(200).json({
        accessToken: accessToken,
      });
    });
  } catch (e) {
    return res.status(400).json({
      error: e,
    });
  }
});

router.patch("/:id", async (req, res) => {});

module.exports = router;
