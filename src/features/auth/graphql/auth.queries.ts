import { gql } from '@apollo/client';

const CHECK_USERNAME_AVAILABILITY = gql`
  query isUsernameAvailable($username: String!) {
    isUsernameAvailable(username: $username)
  }
`;

export { CHECK_USERNAME_AVAILABILITY };
