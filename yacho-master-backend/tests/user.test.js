const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");

const api = supertest(app);

const URL = "/api/users";

beforeEach(async () => {
  await User.deleteMany({});
});

test("Successfully makes new user", async () => {
  const newUser = new User({
    username: "Satsuki",
    password: "meow",
  });
  const response = await api.post(URL).send(newUser);
  console.log("response data,", response.data);
  expect(response.body.username).toBe(newUser.username);
  expect(response.body.id).toBeDefined();
});

afterAll(() => {
  mongoose.connection.close();
});
