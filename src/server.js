const { ApolloServer } = require("apollo-server");
const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// 投稿内容を静的に設定（あとからDB取得できるようにする）
const links = [
  {
    id: "link-1",
    description: "GraphQLの学習1",
    url: "https://www.google.com/?hl=ja",
  },
];

// resolvers関数
const resolvers = {
  Query: {
    info: () => "GraphQLの学習",
    feed: async (parent, args, context) => {
      return context.prisma.link.findMany();
    },
  },

  Mutation: {
    post: (parent, args, context) => {
      const newLink = context.prisma.link.create({
        data: {
          description: "GraphQLの学習",
          url: "https://www.google.com/?hl=ja",
        },
      });
      return newLink;
    },
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
  // resolvers関数内でprismaを利用するための宣言
  context: {
    prisma,
  },
});

server.listen().then(({ url }) => console.log(`🚀  Server ready at: ${url}`));
