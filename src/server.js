const { ApolloServer } = require("apollo-server");
const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const { getUserId } = require("./utils");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Link = require("./resolvers/Link");
const User = require("./resolvers/User");

const prisma = new PrismaClient();

// resolvers関数
const resolvers = {
  Query,
  Mutation,
  Link,
  User,
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
  // resolvers関数内でprismaを利用するための宣言
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      userId: req && req.headers.authorization ? getUserId(req) : null,
    };
  },
});

server.listen().then(({ url }) => console.log(`🚀  Server ready at: ${url}`));
