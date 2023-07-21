// creat our typeDefs for our schema and export them
const typeDefs = `
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
    noteId: String!
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
    plantNotes(id: ID!): [Plantnote]
    plantNote(id: ID!, noteId: String!): Plantnote!
    userPlants: [Plant]
    userPlantNotes: [Plantnote]
    userAllPlantNotes: [Plantnote]
    plantNotifications(id: ID!): [Plant]
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    updateUser(id: ID!, username: String, email: String): User!
    changePassword(id: ID!, currentPassword: String!, newPassword: String!): User!
    login(email: String!, password: String!): Auth
    addPlant(latinName: String!, commonName: String!, img: String!, idealLight: String!, watering: String!, username: String!): User!
    updatePlant(id: ID!, img: String!) : Plant!
    deletePlant(id: ID!): User!
    addPlantNoteToPlant(id: ID! note: String!, username: String!): Plantnote!
    deletePlantNote(noteId: String!): Plantnote!
    updatePlantNote(noteId: String!, note: String!,): Plantnote!
    setPlantNotifications(id: ID!, notification: Boolean!): Plant!
  }
`;

export default typeDefs;
