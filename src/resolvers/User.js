// 誰によって投稿されたか
const links = async (parent, args, context) => {
  return context.prisma.user
    .findUnique({
      where: { id: parent.id },
    })
    .links();
};

module.exports = {
  links,
};
