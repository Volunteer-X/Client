import { gql } from '@app/__generated__/gql';

const GET_PINGS_WITHIN_RADIUS =
  gql(`query GetPingsWithinRadius($payload: UPingsWithinRadiusInput!) {
    getPingsWithinRadius(payload: $payload) {
      id
      createdAt
      title
      latitude
      longitude
      description
      media {
        key
        type
      }
      picks
      radius
      url
      userID
      user {
        id
        name {
          firstName
          lastName
          middleName
        }
        email
        createdAt
        picks
        picture
        username
      }
    }
  }
  `);

export { GET_PINGS_WITHIN_RADIUS };
