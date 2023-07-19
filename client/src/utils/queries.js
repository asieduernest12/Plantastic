import { gql } from '@apollo/client';

export const GET_USER = gql`
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
       