// import { gql } from '@apollo/client';

import { gql } from '@app/__generated__/gql';

// * Possible area to add fragment for better reusability
const CREATE_USER = gql(`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      email
      username
      role
      name {
        firstName
        lastName
      }
      picture
      isRegistered
      picks
    }
  }
`);

export { CREATE_USER };
