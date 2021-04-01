const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");

//WHOOPS still can't get token without this
const getToken = (request) => {
  const authorization = request.get("authorization");
  console.log("authorization???", authorization);
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    return authorization.substring(7);
  }
  return null;
};

loginRouter.post("/check", async (request, response, next) => {
  try {
    const token = getToken(request);
    console.log("token inside loginRouter", token);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    console.log("decoded token", decodedToken);
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }
    const user = await User.findOne({ _id: decodedToken.id }).populate(
      "answers",
      {
        xenoId: 1,
        nameEn: 1,
        nameJp: 1,
        right: 1,
        wrong: 1,
        id: 1,
      }
    );
    console.log("user inside check", user);
    return response.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

loginRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body;
    console.log("body inside loginRouter", body);
    const user = await User.findOne({ username: body.username }).populate(
      "answers",
      {
        bird: 1,
        right: 1,
        wrong: 1,
        id: 1,
      }
    );
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
      user,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = loginRouter;
