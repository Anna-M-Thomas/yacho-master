const express = require("express");
const cors = require("cors");
const app = express();
const middleware = require("./utils/middleware");

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(express.static("files"));

// app.get("/api/songs/:id", (request, response, next) => {
//   const id = request.params.id;
//   response.json(`I should be sending back an mp3 of id ${id}`);
// });

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
