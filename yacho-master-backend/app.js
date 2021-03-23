const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const cors = require("cors");
const usersRouter = require("./controllers/users");
const questionsRouter = require("./controllers/questions");
const loginRouter = require("./controllers/login");
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

app.use("/api/users", usersRouter);
app.use("/api/nextquestion", questionsRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
