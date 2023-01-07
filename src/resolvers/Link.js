// 誰によって投稿されたか
const postedBy = async (parent, args, context) => {
  return context.prisma.link
    .findUnique({
      where: { id: parent.id },
    })
    .postedBy();
};

module.exports = {
  postedBy,
};
