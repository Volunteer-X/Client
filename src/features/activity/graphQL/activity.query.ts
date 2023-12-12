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
          ...PingFragment
        }
      }
      owner {
        ...UserFragment
      }
    }
  }
`);
