const jwt = require("jsonwebtoken");
const answersRouter = require("express").Router();
const User = require("../models/user");
const Answer = require("../models/answer");

//WHOOPS can't get token without this
const getToken = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    return authorization.substring(7);
  }
  return null;
};

answersRouter.post("/", async (request, response, next) => {
  try {
    const token = getToken(request);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    console.log("decoded token", decodedToken);
    const answer = new Answer({
      bird: request.body.bird,
      right: request.body.right,
      wrong: request.body.wrong,
    });

    //I don't need to return user, I just need answer to add to user's answers array in front end
    const user = await User.findByIdAndUpdate(request.body.user, {
      $addToSet: {
        answers: answer,
      },
    });

    answer.user = user.id;
    await answer.save();
    response.json(answer);
  } catch (error) {
    next(error);
  }
});

answersRouter.post("/:id", async (request, response, next) => {
  try {
    const right = request.body.right;
    const wrong = request.body.wrong;

    const answer = await Answer.findByIdAndUpdate(
      request.params.id,
      { right, wrong },
      { new: true }
    );

    response.json(answer);
  } catch (error) {
    next(error);
  }
});

module.exports = answersRouter;
