require("dotenv").config();
const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError
} = require("apollo-server");
const Author = require("./models/author");
const Book = require("./models/book");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const { PubSub } = require("apollo-server");
const pubsub = new PubSub();

const JWT_SECRET = process.env.JWT_SECRET;

const mongoUrl = process.env.MONGO_URI;

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(e => console.log("Error connecting to MongoDB: ", e.message));

const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
  type Book {
    id: ID!
    title: String!
    author: Author
    published: Int!
    genres: [String]!
  }
  type Author {
    id: ID!
    name: String!
    born: Int
    bookCount: Int!
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Subscription {
    bookAdded: Book!
  }
`;

const getBookCount = async authorId => {
  const books = await Book.find({ author: authorId });
  return books.length;
};

const resolvers = {
  Query: {
    me: (root, args, context) => context.currentUser,
    bookCount: async () => {
      const books = await Book.find({});
      return books.length;
    },
    authorCount: async () => {
      const authors = await Author.find({});
      return authors.length;
    },
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author });
        if (!author) {
          return [];
        }
        return Book.find({ author: author.id, genres: { $in: [args.genre] } });
      } else if (args.author) {
        const author = await Author.findOne({ name: args.author });
        if (!author) {
          return [];
        }
        return Book.find({ author: author.id });
      } else if (args.genre) {
        const books = await Book.find({ genres: { $in: [args.genre] } });
        return books;
      }
      const books = await Book.find({});
      return books;
    },
    allAuthors: async () => {
      const authors = await Author.find({}).populate("books");
      return authors;
    }
  },
  Author: {
    bookCount: async root => root.books.length
  },
  Book: {
    author: async root => {
      const author = await Author.findById(root.author).populate("books");
      const response = {
        ...author._doc,
        id: author._id,
        bookCount: author.books.length
      };
      return response;
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("Not Authenticated");
      }

      try {
        let authorId;
        let author = await Author.findOne({ name: args.author }).populate(
          "books"
        );
        if (author) {
          authorId = author._id;
        } else {
          author = await new Author({ name: args.author }).save();
          authorId = author._id;
        }
        const newBook = await new Book({ ...args, author: authorId }).save();
        author.books = author.books.concat(newBook._id);
        author.save();
        pubsub.publish("BOOK_ADDED", { bookAdded: newBook });
        return newBook;
      } catch (e) {
        throw new UserInputError(e.message, { invalidArgs: args });
      }
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("Not Authenticated");
      }

      const author = await Author.findOne({ name: args.name }).populate(
        "books"
      );
      if (!author) {
        return null;
      }
      author.born = args.setBornTo;
      await author.save();
      return author;
    },
    createUser: (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      });

      return user.save().catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secred") {
        throw new UserInputError("Wrong Credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"])
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
