import { gql } from '@app/__generated__/gql';

const UPDATE_USER = gql(`
  mutation UpdateUser($payload: UpdateUserInput!) {
  updateUser(payload: $payload) {
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

export { UPDATE_USER };
