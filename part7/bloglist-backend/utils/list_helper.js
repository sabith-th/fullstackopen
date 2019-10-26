const _ = require("lodash");
const dummy = blogs => 1;

const totalLikes = blogs => blogs.reduce((sum, blog) => sum + blog.likes, 0);

const favoriteBlog = blogs => {
  if (blogs.length === 0) {
    return {};
  }

  const { title, author, likes } = blogs.reduce(
    (fav, blog) => (blog.likes > fav.likes ? blog : fav),
    blogs[0]
  );

  return {
    title,
    author,
    likes
  };
};

const mostBlogs = blogs => {
  if (blogs.length === 0) {
    return {};
  }

  const authorCountMap = blogs.reduce((authorMap, { author }) => {
    if (author in authorMap) {
      authorMap[author] += 1;
    } else {
      authorMap[author] = 1;
    }
    return authorMap;
  }, {});

  let max = 0;
  let prolificAuthor = {};

  _.forEach(authorCountMap, (value, key) => {
    if (value > max) {
      prolificAuthor["author"] = key;
      prolificAuthor["blogs"] = value;
      max = value;
    }
  });

  return prolificAuthor;
};

const mostLikes = blogs => {
  if (blogs.length === 0) {
    return {};
  }

  const authorCountMap = blogs.reduce((authorMap, { author, likes }) => {
    if (author in authorMap) {
      authorMap[author] += likes;
    } else {
      authorMap[author] = likes;
    }
    return authorMap;
  }, {});

  let max = 0;
  let popularAuthor = {};

  _.forEach(authorCountMap, (value, key) => {
    if (value > max) {
      popularAuthor["author"] = key;
      popularAuthor["likes"] = value;
      max = value;
    }
  });

  return popularAuthor;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
