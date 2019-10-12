const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "A New Blog",
    author: "Luke BlogWriter",
    url: "ep4.orginaltrilogy.sw",
    likes: 1977
  },
  {
    title: "The Blogger Writes Back",
    author: "Darth Writer",
    url: "ep5.orginaltrilogy.sw",
    likes: 1980
  }
];

const newBlog = new Blog({
  title: "The Return of the Blogger",
  author: "Pen Solo",
  url: "ep6.originaltrilogy.sw",
  likes: 1983
});

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = initialBlogs.map(blog => new Blog(blog));
  const promiseArray = blogObjects.map(blog => blog.save());

  await Promise.all(promiseArray);
});

describe("blogs api", () => {
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

  test("a new blog is added to the blogs list", async () => {
    await api
      .post("/api/blogs")
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
      .send(new Blog({ title: "A Phantom Blog", url: "ep1.prequeltrilog.sw" }));

    expect(response.body.likes).toBe(0);
  });

  test("400 Bad Request is returned if title or url is missing", async () => {
    await api
      .post("/api/blogs")
      .send(new Blog({ title: "A Phantom Blog" }))
      .expect(400);

    await api
      .post("/api/blogs")
      .send(new Blog({ url: "ep1.prequeltrilog.sw" }))
      .expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
