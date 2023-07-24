import { AuthenticationError } from "apollo-server-express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const secret = "mysecretsshhhhh";
const expiration = "2h";

/**
 *
 * @description add the user to the request object if a token is found else the request object is returned
 * @returns
 */
export const authMiddleware = async function ({ req }) {
  // allows token to be sent via req.body, req.query, or headers
  let token = req?.body?.token || req?.query.token || req?.headers?.authorization;
  // console.log(req)
  // ["Bearer", "<tokenvalue>"]
  if (req?.headers?.authorization) {
    token = token.split(" ").pop().trim();
  }

  if (!token) {
    return req;
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    const user = await User.findById(data._id);
    req.user = user;
  } catch (/** @type {Error}*/ error) {
    console.error(error);
  }

  return req;
};

export const signToken = function ({ username, email, _id }) {
  const payload = { username, email, _id };

  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

export const errorOnNoUser = function (ctx) {
  console.log("check ctx", { user: ctx?.user });
  if (!ctx.user) {
    throw new AuthenticationError("You need to be logged in!");
  }
};
