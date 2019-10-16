const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const middleware = require("./utils/middleware");

const mongoUrl = config.MONGODB_URI;
console.log("Connecting to ", mongoUrl);
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(e => console.log("Error connecting to MongoDB: ", e.message));

app.use(cors());
app.use(bodyParser.json());
app.use(middleware.tokenExtractor);
app.use("/api/login", loginRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use(middleware.errorHandler);

module.exports = app;
