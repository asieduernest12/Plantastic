import User from "../models/User.js";

const resolvers = {
  Query: {
    user: async (parent, { id }) => {
      try {
        const user = await User.findById(id);
        return user;
      } catch (error) {
        throw new Error("Failed to fetch user");
      }
    },
  },
  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      console.log({ username, email, password, User });
      try {
        const user = await User.create({
          username: username,
          email: email,
          password: password,
        });
        console.log({ user });
        return user;
      } catch (error) {
        console.log(error.message);
        throw new Error("Failed to create user", error.message);
      }
    },
  },
};

export default resolvers;
