const jwt = require("jsonwebtoken");
const APP_CRUMB = "graphql";

// トークンを複合する
const getTokenPayLoad = (token) => {
  return jwt.verify(token, APP_CRUMB);
};

const getUserId = (req, authToken) => {
  if (req) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace("Bearer", "");
      if (!token) {
        throw new Error("トークンが見つかりません。");
      }
      const { userId } = getTokenPayLoad(token);
      return userId;
    }
  } else if (authToken) {
    const { userId } = getTokenPayLoad(authToken);
    return userId;
  }
  throw new Error("認証権限がありません。");
};

module.exports = {
  APP_CRUMB,
  getUserId,
};
