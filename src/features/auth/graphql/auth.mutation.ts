// import { gql } from '@apollo/client';

import { gql } from '@app/__generated__/gql';

// * Possible area to add fragment for better reusability
const CREATE_USER = gql(`
mutation CreateUser($payload: CreateUserInput!) {
  createUser(payload: $payload) {
    ... on User {
      id
      email
      username
      name {
        firstName
        lastName
        middleName
      }
      picture
      createdAt
      picks
      activityCount
      devices
    }
    ... on NotFoundError {
      message
    }
    ... on UnknownError {
      message
    }
    ... on InternalServerError {
      message
    }
  }
}
`);

export { CREATE_USER };
