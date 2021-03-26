const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const Answer = require("../models/answer");

const api = supertest(app);

const URL = "/api/answers";

let userid;
let answerid;

beforeEach(async () => {
  await User.deleteMany({});
  await Answer.deleteMany({});

  const userOne = { username: "tsugumi", password: "wormsplz" };
  const returnedUser = await api.post("/api/users").send(userOne);
  userid = returnedUser.body.id;

  const originalAnswer = {
    bird: "56789",
    right: "0",
    wrong: "0",
    user: userid,
  };

  const returnedAnswer = await api.post(URL).send(originalAnswer);
  answerid = returnedAnswer.body.id;
  console.log("answerid inside beforeeach", answerid);
});

test("Answer comes back with correct user, 0 right, 0 wrong", async () => {
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

test.only("Can update an answer", async () => {
  console.log("ansewerid inside test", answerid);
  const updatedAnswer = {
    right: "1",
    wrong: "0",
  };
  const response = await api.post(`${URL}/${answerid}`).send(updatedAnswer);
  expect(response.body.right).toEqual("1");
  expect(response.body.wrong).toBe("0");
  expect(response.body.id).toBeDefined();
});

afterAll(() => {
  mongoose.connection.close();
});
