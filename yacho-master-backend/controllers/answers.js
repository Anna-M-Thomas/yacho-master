const answersRouter = require("express").Router();
const User = require("../models/user");
const Answer = require("../models/answer");

answersRouter.post("/", async (request, response, next) => {
  try {
    console.log("request.body inside answersRouter", request.body);
    const answer = new Answer({
      bird: request.body.bird,
      right: "0",
      wrong: "0",
    });

    //I don't need to return user, I just need answer to add to user's answers array in front end
    const user = await User.findByIdAndUpdate(request.body.user, {
      $addToSet: {
        answers: answer,
      },
    });

    answer.user = user.id;
    await answer.save();
    console.log("user", user);
    console.log("answer", answer);

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
      { _id: `${request.params.id}` },
      { right, wrong },
      { new: true }
    );

    response.json(answer);
  } catch (error) {
    next(error);
  }
});

module.exports = answersRouter;
