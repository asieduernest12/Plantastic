import { gql } from "@apollo/client";

// login(email: String!, password: String!): Auth!
export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
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
  }
`;
//  addPlant(latinName: String!, commonName: String!, img: String!, idealLight: String!, watering: String!, username: String!): Plant!

export const ADD_PLANT = gql`
  mutation addPlant(
    $latinName: String!
    $commonName: String!
    $img: String!
    $idealLight: String!
    $watering: String!
    $username: String!
  ) {
    addPlant(
      latinName: $latinName
      commonName: $commonName
      img: $img
      idealLight: $idealLight
      watering: $watering
      username: $username
    ) {
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

export const UPDATE_PLANT = gql`
  mutation updatePlant($img: String!) {
    updatePlant(img: $img) {
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

export const DELETE_PLANT = gql`
  mutation deletePlant($id: ID!) {
    deletePlant(id: $id) {
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

export const ADD_PLANT_NOTE = gql`
  mutation addPlantNote($note: String!, $username: String!) {
    addPlantNote(note: $note, username: $username) {
      _id
      note
      username
      createdAt
    }
  }
`;

export const DELETE_PLANT_NOTE = gql`
  mutation deletePlantNote($id: ID!) {
    deletePlantNote(id: $id) {
      _id
      note
      username
      createdAt
    }
  }
`;
export const UPDATE_PLANT_NOTE = gql`
  mutation updatePlantNote($id: ID!, $note: String!) {
    updatePlantNote(id: $id, note: $note) {
      _id
      note
      username
      createdAt
    }
  }
`;

export const ADD_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    userdata: createUser(
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $id: ID!
    $username: String!
    $email: String!
    $password: String!
  ) {
    updateUser(
      id: $id
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
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
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
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
