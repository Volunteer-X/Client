import { gql } from '@app/__generated__/gql';

const UPDATE_USER = gql(`
    mutation UpdateUser($payload: UpdateUserInput!) {
  updateUser(payload: $payload) {
    id
    devices
    email
    name {
      firstName
      lastName
      middleName
    }
    createdAt
    picks
    picture
    username
  }
}
`);

export { UPDATE_USER };
