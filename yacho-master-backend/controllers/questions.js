const questionsRouter = require("express").Router();
const birds = require("../birds");
const { getQuestion, getAnswers } = require("../helperfunctions");

questionsRouter.get("/", (request, response, next) => {
  const question = getQuestion(birds);
  const answers = getAnswers(4, question, birds);
  response.json({ question, answers });
});

module.exports = questionsRouter;
