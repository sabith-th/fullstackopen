const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "A New Blog",
    author: "Luke BlogWriter",
    url: "ep4.orginaltrilogy.sw",
    likes: 1977,
    user: "5da6c02e601ff7939486b9ce"
  },
  {
    title: "The Blogger Writes Back",
    author: "Darth Writer",
    url: "ep5.orginaltrilogy.sw",
    likes: 1980,
    user: "5da6c02e601ff7939486b9ce"
  }
];

const newBlog = new Blog({
  title: "The Return of the Blogger",
  author: "Pen Solo",
  url: "ep6.originaltrilogy.sw",
  likes: 1983,
  user: "5da6c02e601ff7939486b9ce"
});

const user = { username: "tony", name: "Tony", password: "tony" };

let authToken = "";

const login = async () => {
  const response = await api.post("/api/login").send(user);
  authToken = "Bearer " + response.body.token;
};

beforeEach(async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});

  await api.post("/api/users").send(user);
  const blogObjects = initialBlogs.map(blog => new Blog(blog));
  const promiseArray = blogObjects.map(blog => blog.save());

  await Promise.all(promiseArray);
  await login();
});

describe("blogs api", () => {
  describe("get all blogs", () => {
    test("blogs are returned as json", async () => {
      await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });

    test("all blogs are returned", async () => {
      const response = await api.get("/api/blogs");
      expect(response.body.length).toBe(initialBlogs.length);
    });

    test("a specific blog is in the returned blogs", async () => {
      const response = await api.get("/api/blogs");
      const titles = response.body.map(r => r.title);
      expect(titles).toContain("A New Blog");
    });

    test("unique id of a blog is named id", async () => {
      const response = await api.get("/api/blogs");
      expect(response.body[0].id).toBeDefined();
    });
  });

  describe("post new blog", () => {
    test("a new blog is added to the blogs list", async () => {
      await api
        .post("/api/blogs")
        .set("Authorization", authToken)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const newBlogs = await api.get("/api/blogs");
      expect(newBlogs.body.length).toBe(initialBlogs.length + 1);
      const titles = newBlogs.body.map(b => b.title);
      expect(titles).toContain("The Return of the Blogger");
    });

    test("default value of 0 is set for likes if likes is not provided", async () => {
      const response = await api
        .post("/api/blogs")
        .set("Authorization", authToken)
        .send(
          new Blog({ title: "A Phantom Blog", url: "ep1.prequeltrilog.sw" })
        );

      expect(response.body.likes).toBe(0);
    });

    test("400 Bad Request is returned if title and/or url is missing", async () => {
      await api
        .post("/api/blogs")
        .set("Authorization", authToken)
        .send(new Blog({ title: "A Phantom Blog" }))
        .expect(400);

      await api
        .post("/api/blogs")
        .set("Authorization", authToken)
        .send(new Blog({ url: "ep1.prequeltrilog.sw" }))
        .expect(400);

      await api
        .post("/api/blogs")
        .set("Authorization", authToken)
        .send(new Blog({ Author: "Jar Jar Writes" }))
        .expect(400);
    });
  });

  describe("delete a blog", () => {
    test("204 is returned after successful deletion of a blog", async () => {
      const response = await api
        .post("/api/blogs")
        .set("Authorization", authToken)
        .send(
          new Blog({ title: "A Phantom Blog", url: "ep1.prequeltrilog.sw" })
        );

      const oldList = await api.get("/api/blogs");
      const idToBeDeleted = response.body.id;

      expect(oldList.body.length).toBe(initialBlogs.length + 1);
      await api
        .delete(`/api/blogs/${idToBeDeleted}`)
        .set("Authorization", authToken)
        .expect(204);

      const newList = await api.get("/api/blogs");
      expect(newList.body.length).toBe(initialBlogs.length);
    });

    test("401 unauthorized is returned if user tries to delete a blog not owned by him", async () => {
      const oldList = await api.get("/api/blogs");
      const idToBeDeleted = oldList.body[0].id;
      expect(oldList.body.length).toBe(initialBlogs.length);
      await api
        .delete(`/api/blogs/${idToBeDeleted}`)
        .set("Authorization", authToken)
        .expect(401);

      const newList = await api.get("/api/blogs");
      expect(newList.body.length).toBe(oldList.body.length);
    });
  });

  describe("update a blog", () => {
    test("number of likes of a blog is successfully updated", async () => {
      const oldList = await api.get("/api/blogs");
      const { id, likes } = oldList.body[0];

      await api.put(`/api/blogs/${id}`).send({ likes: likes + 1 });

      const newList = await api.get("/api/blogs");
      expect(newList.body[0].likes).toBe(likes + 1);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
