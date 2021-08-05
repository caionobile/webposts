const express = require("express");
const db = require("./models");
const postRouter = require("./routes/Posts");
const commentsRouter = require("./routes/Comments");
const usersRouter = require("./routes/Users");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/posts", postRouter);
app.use("/comments", commentsRouter);
app.use("/auth", usersRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
