const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs.map(blog => blog.toJSON()));
  } catch (e) {
    next(e);
  }
});

blogsRouter.post("/", async (request, response, next) => {
  try {
    const blog = new Blog(request.body);

    const result = await blog.save();
    response.status(201).json(result.toJSON());
  } catch (e) {
    next(e);
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.sendStatus(204).end();
  } catch (e) {
    next(e);
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
  try {
    const blog = {
      likes: request.body.likes
    };
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true
    });
    response.json(updatedBlog.toJSON());
  } catch (e) {
    next(e);
  }
});
module.exports = blogsRouter;
