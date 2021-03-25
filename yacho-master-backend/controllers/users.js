const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body;

    if (body.password.length <= 3) {
      return response
        .status(400)
        .json({ error: "Password needs to be longer than 3 characters" });
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      passwordHash,
    });

    const savedUser = await user.save();

    response.json(savedUser);
  } catch (error) {
    next(error);
  }
});

// const answerInfo = { birdId, wasCorrect };

usersRouter.post("/:id", async (resquest, response, next) => {
  try {
    const body = request.body;
    const user = await Blog.findById(body.params.id);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
