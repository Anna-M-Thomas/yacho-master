const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");
const Answer = require("../models/answer");

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

module.exports = usersRouter;
