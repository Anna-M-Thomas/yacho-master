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

    const requestBird = request.body.bird;
    const wasCorrect = request.body.wasCorrect;

    const found = await Answer.find({
      bird: requestBird,
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
        bird: requestBird,
        right: wasCorrect ? 1 : 0,
        wrong: wasCorrect ? 0 : 1,
        user: decodedToken.id,
      });
      await answer.save();
      // console.log("new bird after first answer", answer);

      response.json(answer);
    } else
      console.log(
        `******THERE WAS A PROBLEM*******found.length${found.length} bird${requestBird}`
      );
  } catch (error) {
    next(error);
  }
});

// answersRouter.post("/:id", async (request, response, next) => {
//   try {
//     const right = request.body.right;
//     const wrong = request.body.wrong;

//     const answer = await Answer.findByIdAndUpdate(
//       request.params.id,
//       { right, wrong },
//       { new: true }
//     );

//     response.json(answer);
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = answersRouter;
