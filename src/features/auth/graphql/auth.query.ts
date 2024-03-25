import { gql } from '@app/__generated__/gql';

const CHECK_USERNAME_AVAILABILITY = gql(`
  query isUsernameAvailable($username: String!) {
    isUsernameAvailable(username: $username)
  }
`);

const USER = gql(`
query User {
  user {
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

export { CHECK_USERNAME_AVAILABILITY, USER };
