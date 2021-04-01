const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");
const Answer = require("../models/answer");

//WHOOPS still can't get token without this
const getToken = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    return authorization.substring(7);
  }
  return null;
};

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

usersRouter.delete("/:id", async (request, response, next) => {
  try {
    const token = getToken(request);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }
    await User.findByIdAndRemove(request.params.id);
    await Answer.deleteMany({ user: request.params.id });
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
