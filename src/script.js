// データベースにアクセスするためのクライアントライブラリ
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const main = async () => {
  const newLink = await prisma.link.create({
    data: {
      description: "GraphQLの学習",
      url: "https://www.google.com/?hl=ja",
    },
  });
  const allLinks = await prisma.link.findMany();
  console.log(allLinks);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
