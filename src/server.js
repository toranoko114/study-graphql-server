const { ApolloServer } = require("apollo-server");
const fs = require("fs");
const path = require("path");

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
    feed: () => links,
  },

  Mutation: {
    post: (parent, args) => {
      let idCount = links.length;
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    },
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
});

server.listen().then(({ url }) => console.log(`🚀  Server ready at: ${url}`));
