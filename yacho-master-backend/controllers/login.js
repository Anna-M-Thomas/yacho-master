const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body;
    console.log("body inside loginRouter", body);
    const user = await User.findOne({ username: body.username });
    const passwordCorrect =
      user === null
        ? false
        : await bcrypt.compare(body.password, user.passwordHash);
    if (!(user && passwordCorrect)) {
      return response
        .status(401)
        .json({ error: "Invalid username or password" });
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: "24h",
    });

    return response.status(200).send({
      token,
      username: user.username,
      id: user._id,
      answers: user.answers,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = loginRouter;
