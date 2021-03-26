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

afterAll(() => {
  mongoose.connection.close();
});
