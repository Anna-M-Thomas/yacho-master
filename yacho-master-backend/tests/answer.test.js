const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const Answer = require("../models/answer");

const api = supertest(app);

const URL = "/api/answers";

let userid;

beforeEach(async () => {
  await User.deleteMany({});
  await Answer.deleteMany({});

  const userOne = { username: "tsugumi", password: "wormsplz" };
  const returnedUser = await api.post("/api/users").send(userOne);
  console.log("user id inside beforeEach", returnedUser.body.id);
  userid = returnedUser.body.id;
});

test("Answer comes back with correct user, 0 right, 0 wrong", async () => {
  console.log("user id inside test", userid);
  const newAnswer = {
    bird: "12345",
    right: "0",
    wrong: "0",
    user: userid,
  };
  const response = await api.post(URL).send(newAnswer);
  expect(response.body.id).toBeDefined();
  expect(response.body.user).toEqual(userid);
  expect(response.body.right).toBe("0");
});

afterAll(() => {
  mongoose.connection.close();
});
