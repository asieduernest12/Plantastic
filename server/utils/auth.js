import { AuthenticationError } from "apollo-server-express";
import jwt from "jsonwebtoken";

const secret = "mysecretsshhhhh";
const expiration = "2h";

export const authMiddleware = function (req, res, next) {
  // allows token to be sent via req.body, req.query, or headers
  let token = req?.body?.token || req?.query.token || req?.headers?.authorization;
  // console.log(req)
  // ["Bearer", "<tokenvalue>"]
  if (req?.headers?.authorization) {
    token = token.split(" ").pop().trim();
  }

  if (!token) {
    return next();
    // return req;
  }

  console.log({ token });
  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;
    console.log("user added to req", { user: req.user });
  } catch (/** @type {Error}*/ error) {
    console.error(error);
    throw new AuthenticationError(error.message);
  } finally {
    next();
  }

  // return req;
};

export const signToken = function ({ username, email, _id }) {
  const payload = { username, email, _id };

  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

export const errorOnNoUser = function (ctx) {
  console.log("check ctx", { ctx });
  if (!ctx.user) {
    throw new AuthenticationError("You need to be logged in!");
  }
};
