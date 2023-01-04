const { ApolloServer, gql } = require("apollo-server");

// 投稿内容を静的に設定（あとからDB取得できるようにする）
const links = [
  {
    id: "link-1",
    description: "GraphQLの学習1",
    url: "https://www.google.com/?hl=ja",
  },
];

// GraphQLのスキーマ定義
const typeDefs = gql`
  type Query {
    info: String!
    feed: [Link]!
  }

  type Mutation {
    post(url: String!, description: String!): Link!
  }

  type Link {
    id: ID!
    description: String!
    url: String!
  }
`;

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
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => console.log(`🚀  Server ready at: ${url}`));
