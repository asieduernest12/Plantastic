const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
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
    plantNotes: [Plantnote]
  }

  type Plantnote {
    _id: ID!
    note: String!
    username: String!
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(id: String!): User!
    plants: [Plant]
    plant(id: String!): Plant!
    plantNotes: [Plantnote]
    plantNote: Plantnote!
  }



  type Mutation {
    createUser(username: String!, email: String!, password: String!): User!
    updateUser(username: String!, email: String!, password: String!): User!
    login(email: String!, password: String!): Auth!
    addPlant(latinName: String!, commonName: String!, img: String!, idealLight: String!, watering: String!, username: String!): Plant!
    updatePlant(img: String!) : Plant!
    deletePlant(id: ID!): Plant!
    addPlantNote (note: String!, username: String!): Plantnote!
    deletePlantNote (id: ID!): Plantnote!
  }
`;

export default typeDefs;