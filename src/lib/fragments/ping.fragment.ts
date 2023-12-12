import { gql } from '@app/__generated__/gql';

export const PING_FRAGMENT = gql(`
    fragment PingFragment on Ping {
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
`);
