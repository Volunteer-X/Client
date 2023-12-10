import { gql } from '@app/__generated__/gql';

const CHECK_USERNAME_AVAILABILITY = gql(`
  query isUsernameAvailable($username: String!) {
    isUsernameAvailable(username: $username)
  }
`);

const GET_USER_BY_EMAIL = gql(`
query GetUserByEmail($email: EmailAddress!) {
  getUserByEmail(email: $email) {
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

export { CHECK_USERNAME_AVAILABILITY, GET_USER_BY_EMAIL };
