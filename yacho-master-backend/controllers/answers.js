const jwt = require("jsonwebtoken");
const answersRouter = require("express").Router();
const User = require("../models/user");
const Answer = require("../models/answer");

//WHOOPS can't get token without this
const getToken = (request) => {
  const authorization = request.get("authorization");
  console.log("inside answers router", authorization);
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    return authorization.substring(7);
  }
  return null;
};

answersRouter.post("/", async (request, response, next) => {
  try {
    const token = getToken(request);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const { xenoId, nameEn, nameJp, wasCorrect } = request.body;

    const found = await Answer.find({
      xenoId: xenoId,
      user: decodedToken.id,
    });

    if (found.length === 1) {
      const foundBird = found[0];
      if (wasCorrect) {
        foundBird.right = foundBird.right + 1;
      } else {
        foundBird.wrong = foundBird.wrong + 1;
      }
      await foundBird.save();
      //console.log("found bird after increment", foundBird);
      response.json(foundBird);
    } else if (found.length === 0) {
      const answer = new Answer({
        xenoId,
        nameEn,
        nameJp,
        right: wasCorrect ? 1 : 0,
        wrong: wasCorrect ? 0 : 1,
        user: decodedToken.id,
      });
      await answer.save();

      await User.findOneAndUpdate(
        { _id: decodedToken.id },
        { $push: { answers: answer._id } },
        { new: true }
      );
      response.json(answer);
    } else
      console.log(
        `******THERE WAS A PROBLEM*******found.length${found.length} bird${requestBird}`
      );
  } catch (error) {
    next(error);
  }
});

answersRouter.delete("/", async (request, response, next) => {
  try {
    const token = getToken(request);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }
    await Answer.deleteMany({ user: request.params.id });
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = answersRouter;
