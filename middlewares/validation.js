const { User } = require("../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const [authType, authToken] = (authorization || "").split(" ");

  if (!authType || authType != "Bearer") {
    return res.status(401).send({
      err: "token에 문제가 있습니다.",
    });
  }
  try {
    const { userId } = jwt.verify(authToken, process.env.JWT_TOKEN);
    User.findOne({ id: userId })
      .then((user) => {
        res.locals.user = user.id;
        next();
      })
      .catch((err) => {
        return res.send({ err });
      });
  } catch (err) {
    console.log(err);
    return res.status(401).send({
      err: "사용자를 찾을 수 없습니다.",
    });
  }
};