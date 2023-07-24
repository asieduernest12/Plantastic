import { gql } from "@apollo/client";

/* type User {
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
    */
export const QUERY_USERS = gql`
  query users {
    users {
      _id
      username
      email
      plants {
        _id
        latinName
        commonName
        img
        idealLight
        watering
        username
        notification
        plantNotes {
          _id
          note
          username
          createdAt
        }
      }
    }
  }
`;
export const QUERY_USER = gql`
  query User($userId: ID!) {
    user(id: $userId) {
      username
      _id
      plants {
        latinName
        commonName
        img
        idealLight
        watering
      }
    }
  }
`;
export const QUERY_PLANTS = gql`
  query plants($user_id: ID!) {
    user(user_id: $user_id) {
      username
      _id
      plants {
        latinName
        commonName
        img
        idealLight
        watering
      }
    }
  }
`;

export const QUERY_PLANT = gql`
  query plant($id: ID!) {
    plant(id: $id) {
      _id
      latinName
      commonName
      img
      idealLight
      watering
      username
      notification
      plantNotes {
        _id
        note
        username
        createdAt
      }
    }
  }
`;

export const QUERY_PLANTNOTES = gql`
  query plantNotes {
    plantNotes {
      _id
      note
      username
      createdAt
    }
  }
`;
export const QUERY_PLANTNOTE = gql`
  query plantNote($id: ID!) {
    plantNote(id: $id) {
      _id
      note
      username
      createdAt
    }
  }
`;
