const { gql } = require("apollo-server-express");

// creat our typeDefs for our schema and export them
const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    plants: [Plant]
  }

  type Plant {
    _id: ID!
    latinName: String!
    commonName: String!
    img: String!
    idealLight: String!
    watering: String!
    username: String!
    notification: Boolean!
    plantNotes: [Plantnote]
  }

  type Plantnote {
    _id: ID!
    note: String!
    username: String!
    createdAt: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    users: [User]
    user(id: ID!): User!
    plants: [Plant]
    plant(id: ID!): Plant!
    plantNotes: [Plantnote]
    plantNote: Plantnote!
  }

  input CreateUserInput {
    username: String!
    email: String!
    password: String!
  }

  input UpdateUserInput {
    username: String!
    email: String!
    password: String!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    login(email: String!, password: String!): Auth!
    addPlant(
      latinName: String!
      commonName: String!
      img: String!
      idealLight: String!
      watering: String!
      username: String!
      notification: Boolean!
    ): Plant!
    updatePlant(id: ID!, img: String!): Plant!
    deletePlant(id: ID!): Plant!
    addPlantNote(note: String!, username: String!): Plantnote!
    deletePlantNote(id: ID!): Plantnote!
    updatePlantNote(id: ID!, note: String!): Plantnote!
  }
`;

export default typeDefs;
