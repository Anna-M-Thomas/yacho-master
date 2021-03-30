const questionsRouter = require("express").Router();
const birds = require("../birds");
const { getQuestion, getAnswers } = require("../helperfunctions");

questionsRouter.post("/", (request, response, next) => {
  try {
    const choices = request.body.choices;
    const question = getQuestion(birds);
    const answers = getAnswers(choices, question, birds);
    response.json({ question, answers });
  } catch (error) {
    next(error);
  }
});

module.exports = questionsRouter;
