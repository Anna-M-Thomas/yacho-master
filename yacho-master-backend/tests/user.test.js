const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");

const api = supertest(app);

const URL = "/api/users";

beforeEach(async () => {
  await User.deleteMany({});
  const userOne = new User({ username: "tsugumi", password: "wormsplz" });
  await userOne.save();
});

test("Successfully makes new user", async () => {
  const newUser = {
    username: "Satsuki",
    password: "meow",
  };
  const response = await api.post(URL).send(newUser);
  console.log("response data,", response.body);
  expect(response.body.username).toBe(newUser.username);
  expect(response.body.id).toBeDefined();
  expect(response.body.__v).not.toBeDefined();
});

test("Won't allow duplicate usernames", async () => {
  const dupeUser = {
    username: "tsugumi",
    password: "lalala",
  };
  const response = await api.post(URL).send(dupeUser).expect(400);
  expect(response.body.error).toContain("`username` to be unique");
});

test("Won't allow too short password", async () => {
  const dupeUser = {
    username: "George",
    password: "4",
  };
  const response = await api.post(URL).send(dupeUser).expect(400);
  expect(response.body.error).toContain("longer than 3");
});

test.only("Saves an id in user array", async () => {
  const newUser = {
    username: "Satsuki",
    password: "meow",
  };
  const response = await api.post(URL).send(newUser);
  const id = response.body.id;
  console.log("Id inside the test", id);

  const answer = {
    birdId: "123456",
  };

  const response2 = await api.post(`${URL}/${id}`).send(answer).expect(200);
  expect(response2.body.answers).toContain("123456");
});

afterAll(() => {
  mongoose.connection.close();
});
