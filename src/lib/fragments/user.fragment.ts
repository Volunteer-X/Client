import { gql } from '@app/__generated__/gql';

export const USER_FRAGMENT = gql(`
    fragment UserFragment on User {
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
`);
