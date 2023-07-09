const typeDefs = `
  type User {
    username: String!
    email: String!
    password: String!
  }

  type Query {
    users: [User]
    user(id: String!): User!
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User!
  }
`;

export default typeDefs;
