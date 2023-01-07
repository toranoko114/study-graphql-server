const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_CRUMB } = require("../utils");

// ユーザの新規登録のリゾルバ
const signUp = async (parent, args, context) => {
  // パスワード暗号化
  const encryptedPassword = await bcrypt.hash(args.password, 10);
  // ユーザ新規作成
  const user = context.prisma.user.create({
    data: {
      ...args,
      password: encryptedPassword,
    },
  });
  // トークン化
  const token = jwt.sign({ userId: user.id }, APP_CRUMB);
  return {
    token: token,
    user: user,
  };
};

// ユーザのログインのリゾルバ
const login = async (parent, args, context) => {
  // ユーザの検索
  // await なしだとユーザ返却前に次の処理に行ってしまうため後続処理でエラーとなる
  const user = await context.prisma.user.findUnique({
    where: { email: args.email },
  });

  if (!user) {
    throw new Error("該当するユーザが存在しません。");
  }

  // ユーザが存在する場合パスワードの比較
  const isValid = await bcrypt.compare(args.password, user.password);
  if (!isValid) {
    throw new Error("パスワードが間違っています。");
  }

  // トークン化
  const token = jwt.sign({ userId: user.id }, APP_CRUMB);
  return {
    token: token,
    user: user,
  };
};

// ニュースを投稿するリゾルバ
const post = async (parent, args, context) => {
  const { userId } = context;
  return await context.prisma.link.create({
    data: {
      description: args.description,
      url: args.url,
      postedBy: { connect: { id: userId } },
    },
  });
};

module.exports = {
  signUp,
  login,
  post,
};
