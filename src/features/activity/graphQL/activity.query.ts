import { gql } from '@app/__generated__/gql';

export const GET_ALL_PING = gql(`
  query GetAllPing($first: Int!, $after: String) {
    getAllPing(first: $first, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          id
        title
        description
        createdAt
        latitude
        longitude
        media {
            key
            type
        }
        picks
        radius
        url
        }
      }
      owner {
        id
        createdAt
        username
        email
        name {
            firstName
            lastName
            middleName
        }
        picture
        picks
      }
    }
  }
`);
