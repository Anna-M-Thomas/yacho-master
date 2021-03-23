const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const cors = require("cors");
const birds = require("./birds");

const { getQuestion, getAnswers } = require("./helperfunctions");
const app = express();
const middleware = require("./utils/middleware");

const mongoUrl = config.MONGODB_URI;

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  })
  .then(() => console.log("hooray we connected"))
  .catch((error) => console.log(`O no it's an error ${error} halp`));

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
