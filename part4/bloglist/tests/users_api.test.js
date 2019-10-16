const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");

const initialUsers = [
  {
    name: "Tony Stark",
    username: "tony",
    password: "ironman"
  },
  {
    name: "Steve Rogers",
    username: "steve",
    password: "captain"
  }
];

beforeEach(async () => {
  await User.deleteMany({});
  const userObjects = initialUsers.map(user => new User(user));
  const promiseArray = userObjects.map(user => user.save());
  await Promise.all(promiseArray);
});

describe("users api", () => {
  test("should return all users list as json", async () => {
    const response = await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.length).toBe(initialUsers.length);
  });

  test("should save a new user to db", async () => {
    await api
      .post("/api/users")
      .send({ name: "Thor", username: "thor", password: "lordofthunder" })
      .expect(201);
    const users = await api.get("/api/users").expect(200);
    expect(users.body.length).toBe(initialUsers.length + 1);
    const usernames = users.body.map(user => user.username);
    expect(usernames).toContain("thor");
  });

  test("should return 400 if username not present or less than 3 characters", async () => {
    await api
      .post("/api/users")
      .send({ name: "Thor", password: "lordofthunder" })
      .expect(400);

    await api
      .post("/api/users")
      .send({ name: "Thor", username: "th", password: "lordofthunder" })
      .expect(400);

    const users = await api.get("/api/users").expect(200);
    expect(users.body.length).toBe(initialUsers.length);
  });

  test("should return 400 if password not present or less than 3 characters", async () => {
    await api
      .post("/api/users")
      .send({ name: "Thor", username: "thor" })
      .expect(400);

    await api
      .post("/api/users")
      .send({ name: "Thor", username: "thor", password: "ld" })
      .expect(400);

    const users = await api.get("/api/users").expect(200);
    expect(users.body.length).toBe(initialUsers.length);
  });

  test("should return 400 if username is not unique", async () => {
    await api
      .post("/api/users")
      .send({ name: "Captain America", username: "steve", password: "steve" })
      .expect(400);

    const users = await api.get("/api/users").expect(200);
    expect(users.body.length).toBe(initialUsers.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
