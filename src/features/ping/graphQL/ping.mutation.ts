import { gql } from '@app/__generated__/gql';

const CREATE_PING = gql(`
mutation createPing($createPingInput: CreatePingInput!) {
    createPing(payload: $createPingInput){
        id
        }
    }
    `);

const UPDATE_PING = gql(`
mutation updatePing($id: ObjectID! $UPingInput: UPingInput!) {
    updatePing(id: $id, payload: $UPingInput) {
        id
        createdAt
        title
        description
        picks
        latitude
        longitude
        media {
            key
            type
        }
        user {
            id
            name {
                lastName
                firstName
            }
            username
            picture
        }
    }
    }`);

export { CREATE_PING, UPDATE_PING };
