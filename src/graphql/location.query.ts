import { gql } from '@app/__generated__/gql';

const GET_PINGS_WITHIN_RADIUS = gql(`
  query GetPingsWithinRadius($payload: UPingsWithinRadiusInput!, $first: Int!, $picks: [String], $after: String) {
  getPingsWithinRadius(payload: $payload, first: $first, picks: $picks, after: $after) {
    edges {
      cursor
      node {
        id
        picks
        user {
          id
          username
          name {
            firstName
            lastName
            middleName
          }
          email
          picture
          picks
        }
        description
        createdAt
        latitude
        longitude
        media {
          key
          type
        }
        radius
        title
        url
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
    totalCount
  }
}

  `);

export { GET_PINGS_WITHIN_RADIUS };
