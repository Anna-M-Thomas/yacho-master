const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");

const api = supertest(app);

const URL = "/api/login";

beforeEach(async () => {
  await User.deleteMany({});
  const userOne = { username: "tsugumi", password: "wormsplz" };
  await api.post("/api/users").send(userOne);
});

test("Can login with legit info", async () => {
  const legitUser = {
    username: "tsugumi",
    password: "wormsplz",
  };
  const response = await api.post(URL).send(legitUser);
  expect(response.body.token).toBeDefined();
  expect(response.body.id).toBeDefined();
  expect(response.body.username).toBe("tsugumi");
  expect(response.body.__v).not.toBeDefined();
});

afterAll(() => {
  mongoose.connection.close();
});
