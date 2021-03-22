const express = require("express");
const cors = require("cors");
const birds = require("./birds");
const { getQuestion, getAnswers } = require("./helperfunctions");
const app = express();
const middleware = require("./utils/middleware");

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(express.static("files"));

app.get("/api/nextquestion", (request, response, next) => {
  const question = getQuestion(birds);
  const answers = getAnswers(4, question, birds);
  response.json({ question, answers });
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
