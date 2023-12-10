// import { gql } from '@apollo/client';

import { gql } from '@app/__generated__/gql';

// * Possible area to add fragment for better reusability
const CREATE_USER = gql(`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(payload: $createUserInput) {
      id
      email
      username
      name {
        firstName
        lastName
        middleName
      }
      picture
      picks
      createdAt
    }
  }
`);

export { CREATE_USER };
