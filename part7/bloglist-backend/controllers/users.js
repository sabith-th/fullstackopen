const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

usersRouter.get("/", async (request, response, next) => {
  try {
    const users = await User.find({}).populate("blogs", {
      title: 1,
      likes: 1,
      url: 1,
      id: 1
    });
    response.json(users.map(user => user.toJSON()));
  } catch (e) {
    next(e);
  }
});

usersRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body;
    if (!body.password || body.password.length < 3) {
      return response
        .status(400)
        .send({ error: "password must be at least 3 characters long" });
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);
    const user = new User({
      name: body.name,
      username: body.username,
      password: passwordHash
    });
    const savedUser = await user.save();
    response.status(201).json(savedUser.toJSON());
  } catch (e) {
    next(e);
  }
});

module.exports = usersRouter;
