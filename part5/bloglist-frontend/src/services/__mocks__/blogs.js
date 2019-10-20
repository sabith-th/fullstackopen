const blogs = [
  {
    likes: 2008,
    title: "Iron Man",
    author: "Tony Stark",
    url: "https://ironman.mcu",
    user: {
      name: "Tony Stark",
      username: "tony",
      id: "5da6c02e601ff7939486b9ce"
    },
    id: "5da714447fe705c7b4e8917f"
  },
  {
    likes: 2010,
    title: "Iron Man 2",
    author: "Tony Stark",
    url: "https://ironman2.mcu",
    user: {
      name: "Tony Stark",
      username: "tony",
      id: "5da6c02e601ff7939486b9ce"
    },
    id: "5da714667fe705c7b4e89180"
  },
  {
    likes: 2013,
    title: "Iron Man 3",
    author: "Tony Stark",
    url: "https://ironman3.mcu",
    user: {
      name: "Tony Stark",
      username: "tony",
      id: "5da6c02e601ff7939486b9ce"
    },
    id: "5da71515137991c8088f1d59"
  }
];

const getAll = () => {
  return Promise.resolve(blogs);
};

const setToken = () => {};

export default { getAll, setToken };
