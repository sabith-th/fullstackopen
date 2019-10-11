const {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
} = require("../utils/list_helper");

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
];

test("dummy returns one", () => expect(dummy([])).toBe(1));

describe("total likes", () => {
  test("of empty list is zero", () => {
    expect(totalLikes([])).toBe(0);
  });

  test("when list has only one blog equals the likes of that blog", () => {
    const blog = blogs[0];
    expect(totalLikes([blog])).toBe(blog.likes);
  });

  test("of a bigger list is sum of likes of blogs in that list", () => {
    let likes = 0;
    blogs.forEach(blog => (likes += blog.likes));
    expect(totalLikes(blogs)).toBe(likes);
  });
});

describe("favorite blog", () => {
  test("of empty list is an empty object", () => {
    expect(favoriteBlog([])).toEqual({});
  });

  test("of list with one blog is that blog itself", () => {
    const blog = blogs[0];
    const { author, likes, title } = blog;
    expect(favoriteBlog([blog])).toEqual({ author, likes, title });
  });

  test("of list with many blogs is the one with maximum likes", () => {
    const { author, likes, title } = blogs[2];
    expect(favoriteBlog(blogs)).toEqual({ author, likes, title });
  });
});

describe("most blogs", () => {
  test("of empty list is an empty object", () => {
    expect(mostBlogs([])).toEqual({});
  });

  test("of list with one blog is the author of that blog", () => {
    const { author } = blogs[0];
    expect(mostBlogs([blogs[0]])).toEqual({ author, blogs: 1 });
  });

  test("of list with blog with multiple authors of same count is the first such author", () => {
    const { author } = blogs[0];
    expect(mostBlogs(blogs.slice(0, 1))).toEqual({ author, blogs: 1 });
  });

  test("of list with many blog is the author of with most blog", () => {
    const mostBlogsAuthor = { author: "Robert C. Martin", blogs: 3 };
    expect(mostBlogs(blogs)).toEqual(mostBlogsAuthor);
  });
});

describe("most likes", () => {
  test("of empty list is an empty object", () => {
    expect(mostLikes([])).toEqual({});
  });

  test("of list with one blog is the author of that blog", () => {
    const { author, likes } = blogs[0];
    expect(mostLikes([blogs[0]])).toEqual({ author, likes });
  });

  test("of list with blog with multiple authors having same number of likes is the first such author", () => {
    const mostBlogsAuthor = { author: "Edsger W. Dijkstra", likes: 12 };
    expect(mostLikes(blogs.slice(2, 6))).toEqual(mostBlogsAuthor);
  });

  test("of list with many blog is the author with most likes", () => {
    const mostBlogsAuthor = { author: "Edsger W. Dijkstra", likes: 17 };
    expect(mostLikes(blogs)).toEqual(mostBlogsAuthor);
  });
});
